import { MenuBar } from "../components/MenuBar";
import styles from '../styles/pages/Workspace.module.css';
import { useRef } from "react";
// import { DashboardPicker } from "../components/DashboardPicker";
import { Card, Text, Metric, LineChart, Title } from "@tremor/react";

export const Workspace = () => {
  const workspaceHeader = useRef<HTMLDivElement>(null);
  const dashboards = ['Sales', 'Operations', 'Servers'];

  const chartdata = [
    {
      year: 1970,
      "Export Growth Rate": 2.04,
      "Import Growth Rate": 1.53,
    },
    {
      year: 1971,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.58,
    },
    {
      year: 1972,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1973,
      "Export Growth Rate": 1.93,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1974,
      "Export Growth Rate": 1.88,
      "Import Growth Rate": 1.67,
    },
    //...
  ];

  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.workspaceHeader} ref={workspaceHeader}>
        <select>
          {
            dashboards.map((dashboard, index) => {
              return (
                <option key={'dh' + index} className="px-8">{dashboard}</option>
              )
            })
          }
        </select>
      </div>
      <div className={styles.workspace}>
        <Card className="w-[100%] flex flex-col gap-10" decoration="top" decorationColor="blue">
          <Text className="text-[#003E66] text-5xl">Revenue</Text>
          <Metric className="text-7xl">420.691€</Metric>
        </Card>
        <Card className="w-[100%] flex flex-col gap-10">
          <Title>Export/Import Growth Rates (1970 to 2021)</Title>
          <LineChart
            data={chartdata}
            index="year"
            categories={["Export Growth Rate", "Import Growth Rate"]}
            colors={["emerald", "red"]}
            className="tremor-content-strong"
          />
        </Card>
        <button className='light-button w-full text-[2.2rem] font-semibold !border-[0] mt-6'>
          Add More Element
        </button>
      </div>
      <MenuBar />
    </div>
  )
}