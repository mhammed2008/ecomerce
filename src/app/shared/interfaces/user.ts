export interface Sinup {
  name: string
  email: string
  password: string
  rePassword: string
  phone: string
}
export interface Login {
  email: string
  password: string
}
export interface resetPassword {
  email: string
  newPassword: string
}

export interface forgetPassword {
  email: string
}
