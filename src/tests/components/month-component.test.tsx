import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Month } from "../../components/month-component/month-component";
import { store } from "../../redux/store";

describe("Month-component", () => {


  it("test if dialog render", () => {
    const renderResult = render(
      <Provider store={store}>
        <Month />
      </Provider>
    );
    const element = renderResult.container.querySelector(".newReminderButton");
    expect(element).toBeTruthy();
    if(element){
      fireEvent.click(element);
    }
    expect(screen.getByTestId("spanNewReminder")).toBeInTheDocument()
  });
});
