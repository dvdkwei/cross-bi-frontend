import { DiagrammTypes } from "../enums";
import { useViews } from "../hooks/useViews"
import { BarDiagramm } from "./BarDiagramm";
import { BigNumber } from "./BigNumber";
import { DonutDiagramm } from "./DonutDiagramm";
import { LineDiagramm } from "./LineDiagramm";
import { ListDiagramm } from "./ListDiagramm";

export const DashboardContent = () => {
  const { views } = useViews();

  return (
    <>
      {
        views
          .sort((firstView, nextView) => firstView.id - nextView.id)
          .map((view, index) => {
            if (view.diagramm_type) {
              switch (view.diagramm_type) {
                case DiagrammTypes.BIGNUMBER: {
                  return (
                    <BigNumber
                      key={'1-' + index}
                      viewId={view.id}
                      currency="EUR"
                      decorationColor="green"
                    />
                  )
                }
                case DiagrammTypes.BAR: {
                  return (
                    <BarDiagramm
                      key={'2-' + index}
                      viewId={view.id}
                    />
                  )
                }
                case DiagrammTypes.LINE: {
                  return (
                    <LineDiagramm
                      key={'3-' + index}
                      viewId={view.id}
                    />
                  )
                }
                case DiagrammTypes.DONUT: {
                  return (
                    <DonutDiagramm
                      key={'4-' + index}
                      viewId={view.id}
                      currency="EUR"
                    />
                  )
                }
                case DiagrammTypes.LIST: {
                  return (
                    <ListDiagramm
                      key={'5-' + index}
                      viewId={view.id}
                    />
                  )
                }
              }
            }
          })
      }
      <button
        className='light-button w-full text-[18px] font-semibold !border-[0] mt-6 mb-[70px]'
      >
        Add View
      </button>
    </>
  )
}