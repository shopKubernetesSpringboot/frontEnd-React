import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Messages from "./messages";

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

it("render with or without message", () => {
    act(() => { render(<Messages />, container); });
    expect(container.textContent).toBe("");
    act(() => { render(<Messages errorMsg="error example text" />, container);});
    expect(container.textContent).toBe("error example text");
});