import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import RestClientSelector, { AXIOS, FETCH } from "./RestClientSelector";

let container = null;
beforeEach(() => {
    //configure DOM element as target for rendering
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    //clean at exit
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("render with " + AXIOS + " option", () => {
    act(() => { render(<RestClientSelector restClient={AXIOS} />, container) });
    expect(container.textContent).toContain(AXIOS + " Rest Client:");
});
it("render with " + FETCH + " option", () => {
    act(() => { render(<RestClientSelector restClient={FETCH} />, container) });
    expect(container.textContent).toContain(FETCH + " Rest Client:");
});

it("render clicked option", () => {
    const handler = jest.fn()
    act(() => { render(<RestClientSelector handler={handler} restClient={AXIOS} />, container) });

    const button = document.querySelector("#fetchButton");
    expect(button.innerHTML).toBe(FETCH);
    act(() => { button.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(container.textContent).toContain(FETCH + " Rest Client:");

    const buttonAxios = document.querySelector("#axiosButton");
    expect(buttonAxios.innerHTML).toBe(AXIOS);
    act(() => { buttonAxios.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(container.textContent).toContain(AXIOS + " Rest Client:");
});