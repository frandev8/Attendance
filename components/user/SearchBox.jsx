import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const { Search } = Input;
function SearchBox() {
  return (
    <>
      <Search
        placeholder="Search user..."
        allowClear
        enterButton={
          <Button style={{ background: "blue", color: "white" }}>
            <SearchOutlined />
          </Button>
        }
        style={{
          width: "200px",
          borderColor: "white", // White outline color
        }}
        onSearch={(value) => console.log(value)}
        className="md:hidden"
      />
    </>
  );
}

export default SearchBox;
