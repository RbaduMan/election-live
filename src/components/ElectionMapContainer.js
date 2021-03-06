import React, { useCallback, useContext, useMemo, useState } from "react"
import { checkFilter, filters, zones } from "../models/information"
import { useSummaryData } from "../models/LiveDataSubscription"
import { partyStatsFromSummaryJSON } from "../models/PartyStats"
import ElectionMap from "./ElectionMap"
import { ZoneFilterContext } from "./ZoneFilterPanel"

/**
 *
 * @param {import('../models/LiveDataSubscription').DataState<ElectionDataSource.SummaryJSON>} summaryState
 * @param {IZoneFilter} filter
 */
function getMapData(summaryState, filter) {
  if (!summaryState.completed) {
    return [
      ...zones.map((zone, i) => {
        return {
          id: `${zone.provinceId}-${zone.no}`,
          partyId: "nope",
          complete: false,
          show: false,
        }
      }),
    ]
  } else {
    /** @type {ElectionDataSource.SummaryJSON} */
    const summary = summaryState.data
    const partyStats = partyStatsFromSummaryJSON(summary)
    const partylist = []
    for (const row of partyStats) {
      for (let i = 0; i < row.partyListSeats; i++) {
        partylist.push({
          id: `pl-${partylist.length + 1}`,
          partyId: row.party.id,
          complete: Math.random() > 0.5,
          show: true,
        })
      }
    }
    return [
      ...zones.map((zone, i) => {
        const candidate = (summary.zoneWinningCandidateMap[zone.provinceId] ||
          {})[zone.no]
        const stats = (summary.zoneStatsMap[zone.provinceId] || {})[zone.no]
        return {
          id: `${zone.provinceId}-${zone.no}`,
          partyId: candidate ? candidate.partyId : "nope",
          complete: stats.finished,
          show: checkFilter(filter, zone),
        }
      }),
      ...partylist,
    ]
  }
}

export default function ElectionMapContainer() {
  const summaryState = useSummaryData()
  const currentFilterName = useContext(ZoneFilterContext)
  const currentFilter = filters[currentFilterName]
  const [mapTip, setMapTip] = useState(null)
  const mapZones = useMemo(() => getMapData(summaryState, currentFilter), [
    summaryState,
    currentFilter,
  ])

  const onInit = useCallback(map => {}, [])
  const onZoneMouseenter = useCallback((zone, mouseEvent) => {
    setMapTip({ zone, mouseEvent })
  }, [])
  const onZoneMousemove = useCallback((zone, mouseEvent) => {
    setMapTip({ zone, mouseEvent })
  }, [])
  const onZoneMouseleave = useCallback((zone, mouseEvent) => {
    setMapTip(null)
  }, [])
  const onZoneClick = useCallback(zone => {
    console.log(zone)
  }, [])
  return (
    <div>
      {mapTip && (
        <div
          css={{
            position: "absolute",
            zIndex: 10,
            padding: 6,
            backgroundColor: "#fff",
            pointerEvents: "none",
            boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.3)",
            top: mapTip.mouseEvent.clientY + 10,
            left: mapTip.mouseEvent.clientX + 10,
          }}
        >
          <div>เขต {mapTip.zone.data.id}</div>
          <div>พรรคผ่อน</div>
          <div>
            <small>นอนบ้างนะ</small>
          </div>
        </div>
      )}
      <ElectionMap
        data={mapZones}
        onInit={onInit}
        onZoneMouseenter={onZoneMouseenter}
        onZoneMousemove={onZoneMousemove}
        onZoneMouseleave={onZoneMouseleave}
        onZoneClick={onZoneClick}
      />
    </div>
  )
}
