import { endpoints } from "../../consts/endpoints";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { httpMethods } from "../../consts/httpMethods";

describe("Pruebas en el helper fetch", () => {
  let token = "";
  test("fetchSinToken debe de funcionar", async () => {
    const payload = {
      email: "Anthony.otoniel@hotmail.com",
      password: "123456",
    };
    const resp = await fetchSinToken(
      endpoints.auhtLogin,
      payload,
      httpMethods.Post
    );
    expect(resp instanceof Response).toBe(true);
    const body = await resp.json();
    expect(body.ok).toBe(true);
    token = body.token;
  });
  test("fetchConToken debe de funcionar", async () => {
    localStorage.setItem("token", token);

    const resp = await fetchConToken(
      `${endpoints.putEventos}/62227a925ecc133072b9ed4b`,
      {},
      httpMethods.Delete
    );
    const body = await resp.json();

    expect(body.msg).toBe("El evento que esta intentando actualizar no existe");
  });
});
