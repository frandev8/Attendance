import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
const { Search } = Input;

function SearchBox({
  filterBySearchBox = (f) => f,
  clearSearchBox = (f) => f,
}) {
  const [userInput, setInputValue] = useState("");

  const inputRef = useRef(null);

  const onSearch = (value) => {
    if (value) {
      filterBySearchBox(value.trim());
    }

    return;
  };

  const onClear = () => {
    // Add your custom logic here
    setInputValue("");
    clearSearchBox();
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onPressHandler = () => {
    if (userInput.trim() === "") {
      clearSearchBox();
    }
  };

  return (
    <>
      <Search
        placeholder="Search user..."
        // allowClear
        onSearch={onSearch}
        enterButton={
          <Button style={{ background: "blue", color: "white" }}>
            <SearchOutlined />
          </Button>
        }
        value={userInput}
        style={{
          width: "200px",
          borderColor: "white", // White outline color
        }}
        onChange={onChangeHandler}
        onKeyUp={onPressHandler}
        className="tw-md:hidden"
        addonBefore={
          userInput.trim() ? <CloseCircleOutlined onClick={onClear} /> : ""
        }
      />
    </>
  );
}

export default SearchBox;

SearchBox.propTypes = {
  filterBySearchBox: PropTypes.func,
  clearSearchBox: PropTypes.func,
};
