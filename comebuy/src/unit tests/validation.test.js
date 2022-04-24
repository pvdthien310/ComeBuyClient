import * as validation from '../container/LoginAndRegister/ValidationDataForAccount'

//test CheckPassword
test("Check password", () => {
  const result = validation.CheckPassword("Vongminhhuynh1880")
  expect(result).toBe(true);
})

test("Check password", () => {
  const result = validation.CheckPassword(" ")
  expect(result).toBe(false);
})

test("Check password", () => {
  const result = validation.CheckPassword("vongminhhuynh1880")
  expect(result).toBe(false);
})

test("Check password", () => {
  const result = validation.CheckPassword("VONGMINHHUYNH1880")
  expect(result).toBe(false);
})

//test email
test("Check Email", () => {
  const result = validation.CheckPassword("theostevenson1880@gmail.com")
  expect(result).toBe(true);
})

test("Check Email", () => {
  const result = validation.CheckPassword("theostevenson1880gmail.com")
  expect(result).toBe(false);
})

test("Check Email", () => {
  const result = validation.CheckPassword("theostevenson1880@gmailcom")
  expect(result).toBe(false);
})

test("Check Email", () => {
  const result = validation.CheckPassword("theostevenson1880gmailcom")
  expect(result).toBe(false);
})

//Check Username
test("Check Username", () => {
  const result = validation.CheckPassword("Customer1")
  expect(result).toBe(true);
})

test("Check Username", () => {
  const result = validation.CheckPassword("Customer")
  expect(result).toBe(false);
})

test("Check Username", () => {
  const result = validation.CheckPassword("@.")
  expect(result).toBe(false);
})

//Check phone number
test("Check Phone Number", () => {
  const result = validation.CheckPassword("0235985741")
  expect(result).toBe(true);
})

test("Check Phone Number", () => {
  const result = validation.CheckPassword("02359857411")
  expect(result).toBe(true);
})

test("Check Phone Number", () => {
  const result = validation.CheckPassword("1021598652")
  expect(result).toBe(false);
})

test("Check Phone Number", () => {
  const result = validation.CheckPassword("0245")
  expect(result).toBe(false);
})
