import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import * as rawCountries from '../assets/countries.json';
import { Card, Title, Text } from "@tremor/react";
import { useDiagramData } from "../hooks/useDiagramData";
import { DiagramTypes } from "../enums";
import { useNavigate } from "react-router-dom";
import * as topojson from '../../statics/topojson.json';
import { BigDiagramLoader } from "./BigDiagramLoader";

type Country = {
  name: string,
  alpha2: string,
  alpha3: string,
  numeric: number,
  latitude: number,
  longitude: number
}

type MapChartProps = {
  viewId: number
}

export const MapChart = ({ viewId }: MapChartProps) => {
  const navigate = useNavigate();
  const countries: Country[] = JSON.parse(JSON.stringify(rawCountries['countries']));
  const { title, isLoading, data, xAxisTitle, yAxisTitle } = useDiagramData(viewId);

  const getMapCenter = () => {
    const firstCountry = countries.filter(country => data.map(toMap => toMap[xAxisTitle]).includes(country.alpha3))[0];
    return [firstCountry.longitude, firstCountry.latitude] as [number, number];
  }

  if (isLoading) return <BigDiagramLoader />;

  return (
    <Card
      className="w-[100%] flex flex-col gap-2 !p-2"
      decoration="top"
    >
      {data.length == 0 && <Text>No Data</Text>}
      {data.length > 0 &&
        <>
          <Title
            className="mb-2 !text-[24px]"
            onClick={() => navigate(`/edit/${DiagramTypes.MAP}/${viewId}`)}
          >
            {title}
          </Title>
          <ComposableMap>
            <ZoomableGroup 
              center={getMapCenter()} 
              zoom={10} 
              maxZoom={25} 
              minZoom={3}
            >
              <Geographies geography={topojson}>
                {
                  ({ geographies }) => geographies.map((geo) => {
                    if (data.map(data => data[xAxisTitle]).includes(geo.properties.BRK_A3)) {
                      return <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#96f3ff"
                        stroke="#fff"
                        strokeWidth={.1}
                      />
                    }
                    return <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#EAEAEC"
                    />
                  })
                }
              </Geographies>
              {
                data.map(toMap => {
                  const country = countries.find(country => country.alpha3 == toMap[xAxisTitle]);

                  if (country) {
                    return (
                      <Marker
                        key={country.numeric}
                        coordinates={[country.longitude, country.latitude]}
                      >
                        <circle r={.6} fill="#F00" stroke="none" dominantBaseline={'hanging'} />
                        <text textAnchor="middle" fontSize={1.5}>{country.name}</text>
                        <text textAnchor="middle" fontSize={2} dominantBaseline={'hanging'} fontWeight={'bold'}>{`${yAxisTitle}: ${toMap[yAxisTitle]}`}</text>
                      </Marker>
                    )
                  }

                  return <></>;
                })
              }
            </ZoomableGroup>
          </ComposableMap>
        </>
      }
    </Card>
  )
}