import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { Link } from "react-router-dom";
import { typography } from "@/src/ui/styles/typography";

const Page = styled.div`
  margin-top: ${px2rem(spacing.size8)};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${px2rem(spacing.size6)};
`;

const CreateLink = styled(Link)`
  background-color: ${colors["brand-tangerine-accent"]};
  color: ${colors["grayscale-white-accent"]};
  padding: 0 ${px2rem(spacing.size4)};
  height: ${px2rem(spacing.size8)};
  display: grid;
  place-items: center;
  text-decoration: none;
  border-radius: ${px2rem(spacing.size1)};
  min-width: ${px2rem(160)};
  ${typography.buttonPrimaryText}
`;

export default { Page, Header, CreateLink };
