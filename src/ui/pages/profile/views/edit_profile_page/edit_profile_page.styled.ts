import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formButton, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const Header = styled.div`
  padding: ${px2rem(38)} 0 ${px2rem(spacing.size8)};

  h2 {
    padding-bottom: ${px2rem(spacing.size4)};
  }

  p {
    color: ${colors["grayscale-charcoal-accent"]};
    line-height: ${px2rem(22)};
  }
`;

const ProfileType = styled.div`
  padding-bottom: ${px2rem(57)};

  & > div {
    min-width: ${px2rem(250)};
  }
`;

const Button = styled.div`
  ${formButton}
`;

const Password = styled.div`
  margin-top: ${px2rem(spacing.size2)};
  padding: ${px2rem(spacing.size8)} 0 ${px2rem(spacing.size6)};
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};

  h2 {
    ${formSubtitle}
  }
`;

export default { Header, ProfileType, Button, Password };
