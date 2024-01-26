import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  calculateTimeBetween,
  formatAttendanceDate,
  formatAttendanceTime,
} from "@/utils/date";
import Accept from "./Accept";
import Reject from "./Reject";

export default function AttendanceCard({ data, adminId }) {
  return (
    <Card className="tw-w-full tw-max-w-md">
      <CardHeader className="tw-flex tw-items-center tw-gap-4">
        <Avatar className="tw-h-12 tw-w-12">
          <AvatarImage alt="Employee Avatar" src="/placeholder-avatar.jpg" />
          <AvatarFallback>EA</AvatarFallback>
        </Avatar>
        <div className="tw-space-y-1">
          <CardTitle className="tw-text-lg">Employee Name</CardTitle>
          <CardDescription className="tw-text-sm tw-text-gray-500 tw-dark:text-gray-400">
            Attendance - {formatAttendanceDate()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="tw-grid gap-4">
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="check-in">Check-in</Label>
          <span className="tw-text-sm" id="check-in">
            {formatAttendanceTime(data.clockInTime)}
          </span>
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="check-out">Check-out</Label>
          <span className="tw-text-sm" id="check-out">
            {formatAttendanceTime(data.clockOutTime)}
          </span>
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="break">Break Duration</Label>
          <span className="tw-text-sm" id="break">
            {calculateTimeBetween(data.breakStartTime, data.breakEndTime)}
          </span>
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="overtime">Overtime</Label>
          <span className="tw-text-sm" id="overtime">
            {calculateTimeBetween(data.overtimeStartTime, data.overtimeEndTime)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="tw-flex tw-justify-between">
        <Reject
          adminId={adminId}
          attendanceId={data._id}
          userId={data.userId}
        />
        <Accept
          adminId={adminId}
          attendanceId={data._id}
          userId={data.userId}
        />
      </CardFooter>
    </Card>
  );
}
