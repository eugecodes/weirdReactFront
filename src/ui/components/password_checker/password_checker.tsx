import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CirlceCheck } from "@/src/ui/assets/icons";
import Styled from "./password_checker.styled";

interface Props {
  password: string;
}

const REGEXS = [
  {
    regex: new RegExp(/(?=.*[a-z])/),
    text: "form.requirements.lowerCase"
  },
  {
    regex: new RegExp(/(?=.*[A-Z])/),
    text: "form.requirements.upperCase"
  },
  {
    regex: new RegExp(/(?=.*\d)/),
    text: "form.requirements.numbers"
  },
  {
    regex: new RegExp(/[\w.,-]{8,}/),
    text: "form.requirements.longitude"
  }
];

const VALUES = {
  MIN: 0,
  MAX: 5,
  LOW: 2,
  HIGH: 4,
  OPTIMUM: 5
};

export default function PasswordChecker({ password }: Props) {
  const { t } = useTranslation("reset_password");
  const [checkValue, setCheckValue] = useState(0);

  useEffect(() => {
    const meterValue = REGEXS.reduce((acc, { regex }) => (regex.test(password) ? acc + 1 : acc), 0);

    if (meterValue === VALUES.HIGH) {
      setCheckValue(VALUES.MAX);
    } else {
      setCheckValue(meterValue);
    }
  }, [password]);

  return (
    <div>
      <Styled.MeterWrapper>
        <meter
          id="password-checker"
          min={VALUES.MIN}
          max={VALUES.MAX}
          low={VALUES.LOW}
          high={VALUES.HIGH}
          optimum={VALUES.OPTIMUM}
          value={checkValue}
        />
      </Styled.MeterWrapper>
      <Styled.RequirementWrapper>
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <label htmlFor="password-checker">Nivel de seguridad: {t(`values.${checkValue}`)}</label>
        }
        <div>
          {REGEXS.map(({ text, regex }) => (
            <Styled.Requirement key={text} checked={regex.test(password)}>
              <CirlceCheck />
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <p>{t(text)}</p>
              }
            </Styled.Requirement>
          ))}
        </div>
      </Styled.RequirementWrapper>
    </div>
  );
}
