import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import AddReminder from "../../components/add-reminder-component/add-reminder-component";
import { store } from "../../redux/store";
import { Reminder } from "../../_interfaces/reminder.interface";

describe("Add-reminder", () => {
  const reminderToEdit: Reminder = {
    name: "test",
    color: "#F0F0F0",
    time: new Date("2021-01-01T00:00:00"),
    date: "1",
    id: "_test",
  };

  it("test CRUD reminder in localStorage", () => {
    localStorage.clear();
    const dialog = render(
      <Provider store={store}>
        <AddReminder
          reminderToEdit={reminderToEdit}
          type="edit"
          showDialog={true}
          setShowDialog={() => true}
          day={1}
        />
      </Provider>
    );
    fireEvent.click(dialog.getByTestId("buttonAdd"));
    expect(localStorage.length).toBe(1);
    //Add with the same id should edit in local storage
    fireEvent.click(dialog.getByTestId("buttonAdd"));
    expect(localStorage.length).toBe(1);
    //Remove the reminder created in localStorage
    fireEvent.click(dialog.getByTestId("removeButton"));
    expect(localStorage.length).toBe(0);
  });
});
