import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
const { mount } = require("enzyme");
const { Provider } = require("react-redux");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe("Pruebas en <DeleteEventFab />", () => {
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
