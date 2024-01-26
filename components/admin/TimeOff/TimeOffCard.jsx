import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatTimeOffDate } from "@/utils/date";
import PropTypes from "prop-types";
import AcceptBtn from "./Accept";
import RejectBtn from "./Reject";

export default function TimeOffCard({ data }) {
  return (
    <Card className="tw-w-full tw-max-w-md tw-mx-auto">
      <CardHeader>
        <CardTitle>John Doe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="tw-grid tw-gap-2">
          {/* <div className="tw-flex tw-items-center tw-justify-between">
            <Label htmlFor="role">Role</Label>
            <p className="tw-text-gray-500 tw-dark:text-gray-400" id="role">
              Software Engineer
            </p>
          </div> */}
          <div className="tw-flex tw-items-center tw-justify-between">
            <Label htmlFor="start-date">Start Date</Label>
            <p
              className="tw-text-gray-500 tw-dark:text-gray-400"
              id="start-date"
            >
              {formatTimeOffDate(data.startDate)}
            </p>
          </div>
          <div className="tw-flex tw-items-center tw-justify-between">
            <Label htmlFor="end-date">End Date</Label>
            <p className="tw-text-gray-500 tw-dark:text-gray-400" id="end-date">
              {formatTimeOffDate(data.endDate)}
            </p>
          </div>
          <div className="tw-flex tw-items-center tw-justify-between">
            <Label htmlFor="type">Type</Label>
            <p className="tw-text-gray-500 tw-dark:text-gray-400" id="type">
              {data.type}
            </p>
          </div>
          <div className="tw-flex tw-flex-col tw-items-start tw-justify-between">
            <Label htmlFor="reason">Reason</Label>
            <p className="tw-text-gray-500 tw-dark:text-gray-400" id="reason">
              {data.reason}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="tw-flex tw-justify-between">
        <RejectBtn timeOffId={data._id} />
        <AcceptBtn timeOffId={data._id} />
      </CardFooter>
    </Card>
  );
}

TimeOffCard.propTypes = {
  data: PropTypes.object.isRequired,
};
