import { Tabs as MuiTabs } from "@mui/material";
import Styled from "./tabs.styled";
import { emptyFunction } from "@/src/common/utils";

interface ITab {
  title: string;
  element: JSX.Element;
}

interface Props {
  tabs: ITab[];
  selectedTab?: number;
  onChangeTab?: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function Tabs({ tabs, selectedTab = 0, onChangeTab = emptyFunction }: Props) {
  return (
    <>
      <Styled.TabWrapper>
        <MuiTabs value={selectedTab} onChange={onChangeTab} aria-label="tabs" indicatorColor="secondary" textColor="secondary">
          {tabs.map(({ title }, index) => (
            <Styled.Tab label={title} key={title} id={`tab-${index}`} />
          ))}
        </MuiTabs>
      </Styled.TabWrapper>
      {tabs.map(({ element, title }, index) => (
        <TabPanel selectedTab={selectedTab} index={index} key={title}>
          {element}
        </TabPanel>
      ))}
    </>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  selectedTab: number;
}

function TabPanel({ children, selectedTab, index }: TabPanelProps) {
  const tabId = `tab-${index}`;

  return (
    <Styled.TabPanel role="tabpanel" hidden={selectedTab !== index} id={tabId} aria-labelledby={tabId}>
      {selectedTab === index && <>{children}</>}
    </Styled.TabPanel>
  );
}
