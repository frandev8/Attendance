import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Upload, message } from "antd";
import { useSelector } from "react-redux";
import {
  getAdminAvatar,
  queryClient,
  upLoadAdminAvatar,
} from "../../../utils/http";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadImage = () => {
  const adminId = useSelector((state) => state.admin.adminId);

  const { data: userImage, isPending: onHold } = useQuery({
    queryKey: ["admin", { key: "avatar" }],
    queryFn: () => getAdminAvatar({ id: adminId }),
    staleTime: 0,
  });

  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: upLoadAdminAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", { key: "avatar" }],
      });
    },
    onError: (error) => {
      console.error("Error", error);
    },
  });

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        mutate({ imgUrl: url, id: adminId });
      });
    }
  };

  const uploadButton = (
    <div>
      {onHold ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {userImage ? (
          <img
            src={userImage.url}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadImage;
