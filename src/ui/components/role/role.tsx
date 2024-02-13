import Styled from "./role.styled";

interface Props {
  role: number;
}

export default function Role({ role }: Props) {
  return <Styled.RoleWrapper value={role}>{role === 1 ? "Admin" : "Super Admin"}</Styled.RoleWrapper>;
}
