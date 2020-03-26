import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import RestClient from "./restClient";

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
    act(() => { render(<RestClient />, container); });
    expect(container.textContent).toContain("Axios Rest Client:");
});