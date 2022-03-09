import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { startChecking, StartLogin, startRegister } from "../../actions/auth";
import { types } from "../../consts/types";
import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe("Pruebas en las acciones Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  test("StartLogin correcto", async () => {
    await store.dispatch(StartLogin("Anthony.otoniel@hotmail.com", "123456"));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("StartLogin incorrecto", async () => {
    await store.dispatch(StartLogin("Anthony.otoniel@hotmail.com", "12345s6"));

    let actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Password incorrecto",
      "error"
    );
    await store.dispatch(StartLogin("Anthony.otoniel@hotmasil.com", "123456"));

    actions = store.getActions();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "El usuario no existe con este email",
      "error"
    );
  });
  test("startRegister correcto", async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Carlos",
          token: "abc123abc123acb123",
        };
      },
    }));
    await store.dispatch(startRegister("test@test.com", "123456", "test"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: "123", name: "Carlos" },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      "abc123abc123acb123"
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });
  test("startChecking correcto", async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Carlos",
          token: "abc123abc123acb123",
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: "123", name: "Carlos" },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      "abc123abc123acb123"
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });
});
