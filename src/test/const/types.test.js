import { types } from "../../consts/types";

describe("Pruebas en types", () => {
  test("Los types deben de ser iguales", () => {
    expect(types).toEqual({
      uiOpenModal: "[ui] Open modal",
      uiCloseModal: "[ui] Close modal",

      eventSetActive: "[event] Set Active",
      eventLogout: "[event] Event Logout",

      eventStartAddNew: "[event] Start add new",
      eventAddNew: "[event] Add new",
      eventClearActiveEvent: "[event] Clear active event",
      eventUpdated: "[event] Event updated",
      eventDeleted: "[event] Event deleted",
      eventLoaded: "[event] Loaded",

      authCheckingFinish: "[Auth] Finish checking login state",
      authStartLogin: "[Auth] Start login",
      authLogin: "[Auth] Login",
      authStartRegister: "[Auth] Start register",
      authStartTokenRenew: "[Auth] Start token renew",
      authLogout: "[Auth] Logout",
    });
  });
});
