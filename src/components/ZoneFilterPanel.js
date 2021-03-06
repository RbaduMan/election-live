import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React, { createContext, useRef, useLayoutEffect } from "react"
import { filterPath, filters as areaFilters } from "../models/information"

export const ZoneFilterContext = createContext(
  /** @type {ZoneFilterName} */ ("all")
)

export function ZoneFilterPanel({ onFilterSelect, autoFocus }) {
  const currentLinkRef = useRef(/** @type {HTMLAnchorElement} */ (null))
  useLayoutEffect(() => {
    if (autoFocus && currentLinkRef.current) {
      currentLinkRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div>
      <div css={{ fontSize: 20, fontWeight: "bold" }}>เขตพื้นที่</div>
      <ul css={{ padding: 0, listStyle: "none" }}>
        {renderFilter("all")}
        {renderFilter("northern")}
        {renderFilter("northeastern")}
        {renderFilter("central")}
        {renderFilter("southern")}
      </ul>
      <div css={{ fontSize: 20, fontWeight: "bold" }}>ตัวเลือกพิเศษ</div>
      <ul css={{ padding: 0, listStyle: "none" }}>
        {renderFilter("urban")}
        {renderFilter("rural")}
        {renderFilter("gerrymandering")}
        {renderFilter("swing")}
      </ul>
    </div>
  )

  /**
   * @param {ZoneFilterName} filterName
   */
  function renderFilter(filterName) {
    return (
      <div>
        <ZoneFilterContext.Consumer>
          {currentFilterName => {
            const current = currentFilterName === filterName
            return (
              <li css={{ paddingTop: 10, paddingBottom: 10 }}>
                <Link
                  to={filterPath(filterName)}
                  onClick={onFilterSelect}
                  ref={current ? currentLinkRef : undefined}
                  css={{
                    opacity: current ? 1 : 0.62,
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span css={{ marginRight: 10 }}>
                    {current && <FontAwesomeIcon icon={faCheckCircle} />}
                    {!current && <FontAwesomeIcon icon={faCircle} />}
                  </span>
                  <span>{areaFilters[filterName].name.th}</span>
                </Link>
              </li>
            )
          }}
        </ZoneFilterContext.Consumer>
      </div>
    )
  }
}
