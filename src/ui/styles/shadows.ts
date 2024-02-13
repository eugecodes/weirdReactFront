import type { FlattenSimpleInterpolation } from "styled-components";
import { css } from "styled-components";
import { px2rem } from "@/src/ui/styles/utils";

export type shadowsType = "30" | "60";

export const shadows: Record<shadowsType, FlattenSimpleInterpolation> = {
  30: css`0 0 ${px2rem(30)} rgba(228, 233, 239, 0.3);`,
  60: css`0 0 ${px2rem(60)} rgba(228, 233, 239, 0.6);`
};
