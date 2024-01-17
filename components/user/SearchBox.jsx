import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import PropTypes from "prop-types";

const { Search } = Input;

function SearchBox({ filterBySearchBox = (f) => f }) {
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);

    if (value) {
      filterBySearchBox(value);
    }
    return;
  };

  return (
    <>
      <Search
        placeholder="Search user..."
        allowClear
        onSearch={onSearch}
        enterButton={
          <Button style={{ background: "blue", color: "white" }}>
            <SearchOutlined />
          </Button>
        }
        style={{
          width: "200px",
          borderColor: "white", // White outline color
        }}
        className="tw-md:hidden"
      />
    </>
  );
}

export default SearchBox;

SearchBox.propTypes = {
  filterBySearchBox: PropTypes.func,
};
