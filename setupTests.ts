/* eslint-disable @typescript-eslint/no-empty-function */
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

configure({ adapter: new Adapter() });
