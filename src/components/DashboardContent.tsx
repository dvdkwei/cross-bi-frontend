import { useNavigate } from "react-router-dom";
import { DiagramTypes } from "../enums";
import { BarDiagram } from "./BarDiagram";
import { BigNumber } from "./BigNumber";
import { DonutDiagram } from "./DonutDiagram";
import { LineDiagram } from "./LineDiagram";
import { ListDiagram } from "./ListDiagram";
import { useViewsOfWorkspaceAndDashboard } from "../hooks/useViewsOfWorkspaceAndDashboard";
import { MapChart } from "./MapChart";

export const DashboardContent = () => {
  const { views } = useViewsOfWorkspaceAndDashboard();
  const navigate = useNavigate();

  return (
    <>
      {
        views
          .sort((firstView, nextView) => firstView.id - nextView.id)
          .map((view, index) => {
            if (view.diagramm_type) {
              switch (view.diagramm_type) {
                case DiagramTypes.BIGNUMBER: {
                  return (
                    <BigNumber
                      key={'1-' + index}
                      viewId={view.id}
                      currency="EUR"
                      decorationColor="green"
                    />
                  )
                }
                case DiagramTypes.BAR: {
                  return (
                    <BarDiagram
                      key={'2-' + index}
                      viewId={view.id}
                    />
                  )
                }
                case DiagramTypes.LINE: {
                  return (
                    <LineDiagram
                      key={'3-' + index}
                      viewId={view.id}
                    />
                  )
                }
                case DiagramTypes.DONUT: {
                  return (
                    <DonutDiagram
                      key={'4-' + index}
                      viewId={view.id}
                      currency="EUR"
                    />
                  )
                }
                case DiagramTypes.LIST: {
                  return (
                    <ListDiagram
                      key={'5-' + index}
                      viewId={view.id}
                    />
                  )
                }
                case DiagramTypes.MAP: {
                  return (
                    <MapChart
                      key={'6-' + index}
                      viewId={view.id}
                    />
                  )
                }
              }
            }
          })
      }
      <button
        className='light-button w-full text-[14px] font-semibold !border-[0] mt-6 mb-[70px]'
        onClick={() => navigate('/add')}
      >
        Add View
      </button>
    </>
  )
}