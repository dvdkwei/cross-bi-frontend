import { DiagrammTypes } from "../enums";
import { useView } from "../hooks/useView"
import { BarDiagramm } from "./BarDiagramm";
import { BigNumber } from "./BigNumber";
import { DonutDiagramm } from "./DonutDiagramm";
import { LineDiagramm } from "./LineDiagramm";
import { ListDiagramm } from "./ListDiagramm";

export const DashboardContent = () => {
  const { views } = useView();

  return (
    <>
      {
        views.map((view, index) => {
          if(view.diagramm_type){
            switch(view.diagramm_type){
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
                    title={view.name}
                    viewId={view.id}
                    currency="EUR"
                  />
                )
              }
              case DiagrammTypes.LIST: { 
                return (
                  <ListDiagramm 
                    key={'5-' + index}
                    title={view.name}
                    viewId={view.id}
                  />
                )
              }
            }
          }
        })
      }
      <h1>{views.length > 0 && JSON.stringify(views)}</h1>
      <button className='light-button w-full text-[2.2rem] font-semibold !border-[0] mt-6'>
        Add More Element
      </button>
    </>
  )
}