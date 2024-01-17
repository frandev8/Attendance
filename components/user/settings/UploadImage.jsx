import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Upload, message } from "antd";
import { useSelector } from "react-redux";
import {
  getEmployeeAvatar,
  queryClient,
  upLoadEmployeeAvatar,
} from "../../../utils/http";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
// const beforeUpload = (file) => {
//   console.log(file.type);
//   const isJpgOrPng =
//     file.type === "image/jpeg" ||
//     file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG,JPEG, and PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 20;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// };

const beforeUpload = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set the dimensions based on your requirements
        const maxWidth = 800;
        const maxHeight = 600;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          // Replace the original file with the resized blob
          file = new File([blob], file.name, { type: "image/jpeg" });

          resolve(file);
        }, "image/jpeg");
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

//
const UploadImage = () => {
  const userId = useSelector((state) => state.user.userId);

  const { data: userImage, isPending: onHold } = useQuery({
    queryKey: ["employee", { key: "avatar" }],
    queryFn: () => getEmployeeAvatar({ id: userId }),
    staleTime: 0,
  });

  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: upLoadEmployeeAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee", { key: "avatar" }],
      });
    },
    onError: (error) => {
      console.error("Error", error);
    },
  });

  const handleChange = (info) => {
    console.log("change works...", info.file.status);

    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      console.log("uploading...");
      getBase64(info.file.originFileObj, (url) => {
        mutate({ imgUrl: url, id: userId });
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
