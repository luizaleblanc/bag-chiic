// Este é um mock de "banco de dados" em memória para fins de demonstração.
// Em uma aplicação real, você usaria um banco de dados persistente (ex: PostgreSQL, MongoDB).

interface User {
  id: string
  fullName: string
  email: string
  passwordHash: string // Em um cenário real, seria um hash da senha
  cpf: string
  phone: string
  dateOfBirth: string
  gender?: string
  role: "user" | "admin"
}

const users: User[] = [] // Array para armazenar usuários cadastrados

export function addUserToDb(user: Omit<User, "id" | "role">): User {
  const newUser: User = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    role: "user", // Novos usuários são sempre 'user' por padrão
    ...user,
  }
  users.push(newUser)
  console.log("Usuário adicionado ao DB (mock):", newUser)
  return newUser
}

export function getUserByEmailFromDb(email: string): User | undefined {
  return users.find((user) => user.email === email)
}

export function getAllUsersFromDb(): User[] {
  return users
}

// No updates were provided, so the existing code remains unchanged.
