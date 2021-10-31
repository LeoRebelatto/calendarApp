import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import AddReminder from "../../components/add-reminder-component/add-reminder-component";
import { Month } from "../../components/month-component/month-component";
import { store } from "../../redux/store";

describe("Month-component", () => {


  it("test if dialog render", () => {
    render(
      <Provider store={store}>
        <Month />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("newReminderButton"));
    //expect(screen.queryByText("New reminder")).toBeInTheDocument()
  });
});
