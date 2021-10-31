import { render, screen, fireEvent } from "@testing-library/react";
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

  it("test if reminder was add in localStorage", () => {
    localStorage.clear();
    render(
      <Provider store={store}>
        <AddReminder
          reminderToEdit={reminderToEdit}
          type="new"
          showDialog={true}
          setShowDialog={() => true}
          day={1}
        />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("buttonAdd"));
    expect(localStorage.length).toBe(1);
  });

//   it("test when edit reminder the localStorage length continues the same", () => {
//     let length = localStorage.length;
//     render(
//       <Provider store={store}>
//         <AddReminder
//           reminderToEdit={reminderToEdit}
//           type="edit"
//           showDialog={true}
//           setShowDialog={() => true}
//           day={1}
//         />
//       </Provider>
//     );
//     fireEvent.click(screen.getByTestId("buttonAdd"));
//     fireEvent.click(screen.getByTestId("buttonAdd"));
//     expect(localStorage.length).toEqual(length);
//   });
});
