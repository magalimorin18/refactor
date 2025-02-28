import { Invoice, Plays } from "./interface";
import { statement } from "./statement"; // Adjust the path if necessary
import { invoices, plays } from "./variables";

test("statement generates the correct output", () => {
  const expectedOutput = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;

  // Capture console output
  const consoleSpy = jest.spyOn(console, "log").mockImplementation();

  statement(invoices, plays);

  expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);

  consoleSpy.mockRestore();
});
