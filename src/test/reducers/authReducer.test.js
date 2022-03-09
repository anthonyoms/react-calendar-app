import { types } from "../../consts/types";
import { authReducer } from "../../reducers/authReducer";
const initialState = {
  checking: true,
  // uid: null,
  //name: null,
};
describe("Pruebas en el authReducer", () => {
  test("debe de retornar el estado por deefcto", () => {
    const action = {};
    const state = authReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
  test("debe hacer el login", () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "Anthony",
      },
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ checking: false, name: "Anthony", uid: "123" });
  });
});
