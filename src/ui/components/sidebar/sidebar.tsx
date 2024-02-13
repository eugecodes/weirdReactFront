import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Logo,
  Face,
  WhiteArrow,
  Payments,
  AcountBalance,
  DeviceHub,
  Business,
  BarChart,
  Group,
  Location,
  Work,
  Apartment,
  LightBulb,
  Gas
} from "@/src/ui/assets/icons";
import Styled from "./sidebar.styled";
import { useTranslation } from "react-i18next";
import paths from "@/src/ui/router/paths";

interface ILink {
  href: string;
  icon: string;
  text: string;
  children?: Array<this>;
  childrenTitle?: string;
  subitems?: Array<this>;
  subitemsTitle?: string;
}

export default function Sidebar() {
  const { t } = useTranslation("sidebar");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<ILink>();
  const navbarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const links = useMemo(
    () => [
      {
        href: paths.profile.index,
        icon: Face,
        text: t("users.title")
      },
      {
        href: "",
        icon: AcountBalance,
        text: t("marketParams.title"),
        children: [
          {
            href: paths.rateType.index,
            icon: DeviceHub,
            text: t("marketParams.rateType")
          },
          {
            href: paths.energyCost.index,
            icon: Payments,
            text: t("marketParams.energyCosts")
          }
        ]
      },
      {
        href: "",
        icon: Apartment,
        text: t("marketers.title"),
        children: [
          {
            href: paths.marketer.index,
            icon: Business,
            text: t("marketers.myMarketers")
          },
          {
            href: paths.rate.index + paths.rate.light,
            icon: LightBulb,
            text: t("marketers.rateLight")
          },
          {
            href: paths.rate.index + paths.rate.gas,
            icon: Gas,
            text: t("marketers.rateGas")
          }

          /*  {
            href: "",
            icon: Face,
            text: t("marketers.historicalPrices")
          }, */
          /* {
            href: "",
            icon: LocalAtm,
            text: t("marketers.theoreticalCommissions")
          }  */
        ]
      },
      {
        href: paths.savingStudy.index,
        icon: BarChart,
        text: t("savingStudies.title")
      },
      {
        href: paths.client.index,
        icon: Group,
        text: t("client.title")
      },
      {
        href: paths.supplyPoint.index,
        icon: Location,
        text: t("supplyPoints.title")
      },
      {
        href: paths.contract.index,
        icon: Work,
        text: t("contract.title")
      }
      /* {
        href: "",
        icon: Analytics,
        text: t("consumptionData")
      }, */
      /* {
        href: "",
        icon: Article,
        text: t("documentation")
      } */
      /*       {
        href: "",
        icon: Euro,
        text: t("commissions.title"),
        childrenTitle: t("marketers.title"),
        children: [
          { href: "", icon: Face, text: t("commissions.title") },
          { href: "", icon: Face, text: t("commissions.invoices") },
          { href: "", icon: Face, text: t("commissions.chargebacks") }
        ],
        subitemsTitle: t("commissions.channel"),
        subitems: [
          { href: "", icon: Face, text: t("commissions.title") },
          { href: "", icon: Face, text: t("commissions.invoices") },
          { href: "", icon: Face, text: t("commissions.chargebacks") }
        ]
      }, */
      /*       {
        href: "",
        icon: QueryStats,
        text: t("sips.title")
      } */
    ],
    [t]
  );

  useEffect(() => {
    const onClick = (event: globalThis.MouseEvent) => {
      const target = (event.target as Node) || {};
      const isOutsideSidebar = navbarRef.current && !navbarRef.current.contains(target);
      const targetAsElement = event.target as HTMLElement;
      const isLink = target.parentElement?.hasAttribute("href") || targetAsElement?.hasAttribute("href");

      if (isOutsideSidebar || isLink) {
        setIsOpen(false);
        setIsSubmenuOpen(false);
        setSelectedLink(undefined);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [navbarRef]);

  const onClickNavbar = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const onClickItemWithChildren = useCallback(
    (link: ILink) => {
      if (!selectedLink || selectedLink.text !== link.text) {
        setSelectedLink(link);
        setIsSubmenuOpen(true);
      } else {
        setSelectedLink(undefined);
      }
    },
    [selectedLink]
  );

  const onClickItemWithoutChildren = useCallback(
    (href: string) => {
      navigate(href);

      if (selectedLink) {
        setSelectedLink(undefined);
      }
    },
    [navigate, selectedLink]
  );

  const onClickLink = useCallback(
    (link: ILink) => {
      if (link.children) {
        onClickItemWithChildren(link);
      } else {
        onClickItemWithoutChildren(link.href);
      }
    },
    [onClickItemWithChildren, onClickItemWithoutChildren]
  );

  return (
    <Styled.Sidebar isOpen={isOpen} ref={navbarRef}>
      <Styled.SidebarButton isOpen={isOpen} onClick={onClickNavbar}>
        <button>
          <span />
        </button>
        <Logo />
      </Styled.SidebarButton>
      <Styled.Links isOpen={isOpen}>
        {links.map((link) => (
          <button key={link.text} onClick={() => onClickLink(link)}>
            <link.icon />

            {isOpen && <span>{link.text}</span>}
            {Boolean(link.children?.length) && (
              <Styled.ArrowIcon>
                <WhiteArrow />
              </Styled.ArrowIcon>
            )}
          </button>
        ))}
      </Styled.Links>
      <Styled.Submenu isOpen={Boolean(isSubmenuOpen && selectedLink && selectedLink.children)}>
        <Styled.SubmenuHeader>
          {selectedLink && (
            <div>
              <selectedLink.icon />
              <span>{selectedLink.text}</span>
            </div>
          )}
        </Styled.SubmenuHeader>
        <Styled.Links isOpen={isOpen}>
          {selectedLink?.childrenTitle && <Styled.SubmenuTitle>{selectedLink.childrenTitle}</Styled.SubmenuTitle>}
          {selectedLink?.children?.map(({ href, text, icon: Icon }) => (
            <Link to={href} key={text}>
              <Icon />
              <span>{text}</span>
            </Link>
          ))}
        </Styled.Links>
        <Styled.Links isOpen={isOpen}>
          {selectedLink?.subitemsTitle && <Styled.SubmenuTitle border>{selectedLink.subitemsTitle}</Styled.SubmenuTitle>}
          {selectedLink?.subitems?.map(({ href, text, icon: Icon }) => (
            <Link to={href} key={text}>
              <Icon />
              <span>{text}</span>
            </Link>
          ))}
        </Styled.Links>
      </Styled.Submenu>
    </Styled.Sidebar>
  );
}
