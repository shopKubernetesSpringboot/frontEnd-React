import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import RestClientComp from "./RestClient";

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

it("render with default option", () => {
    act(() => {render(<RestClientComp restClient='Axios'/>, container)});
    expect(container.textContent).toContain("Axios Rest Client:");
});
it("render with Fetch option", () => {
    act(() => {render(<RestClientComp restClient='Fetch'/>, container)});
    expect(container.textContent).toContain("Fetch Rest Client:");
});

it("render clicked option", () => {
    const handler=jest.fn()
    act(() => {render(<RestClientComp handler={handler} restClient='Axios'/>, container)});
  
    const button = document.querySelector("#fetchButton");
    expect(button.innerHTML).toBe("Fetch");
    act(() => { button.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(container.textContent).toContain("Fetch Rest Client:");
  
    const buttonAxios = document.querySelector("#axiosButton");
    expect(buttonAxios.innerHTML).toBe("Axios");
    act(() => { buttonAxios.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(container.textContent).toContain("Axios Rest Client:");
  });