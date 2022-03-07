import Swal from "sweetalert2";
import { endpoints } from "../consts/endpoints";
import { httpMethods } from "../consts/httpMethods";
import { types } from "../consts/types";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchConToken(
        endpoints.eventPost,
        event,
        httpMethods.Post
      );
      const body = await resp.json();

      if (body.ok) {
        event.id = body.evento.id;
        event.user = { _id: uid, name };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `${endpoints.putEventos}${event.id}`,
        event,
        httpMethods.Put
      );
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventSartDelete = () => {
  return async (dispatch, getState) => {
    const event = getState().calendar.activeEvent;
    try {
      const resp = await fetchConToken(
        `${endpoints.putEventos}${event.id}`,
        event,
        httpMethods.Delete
      );
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventDeleted(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(endpoints.getEventos);
      const body = await resp.json();
      const events = prepareEvents(body.eventos);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
