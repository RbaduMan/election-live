import React from "react"
import "../styles/global.css"
import GlobalPanel from "./GlobalPanel"
import NavBar from "./NavBar"
import Footer from "./Footer"

// @todo #1 Implement responsive layout and navigation

// @todo #1 Add page title using Helmet
//  (see: https://www.gatsbyjs.org/docs/add-page-metadata)

// @todo #1 Add gatsby-plugin-layout to prevent the whole layout from unmounting every time.
//  (see: https://www.gatsbyjs.org/docs/layout-components/#how-to-prevent-layout-components-from-unmounting)

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <div css={{ margin: "13px 16px" }}>
        <img
          src={require("../styles/images/site-logo.png")}
          alt="ELECT"
          css={{ maxWidth: 150, width: "100%", display: "block" }}
        />
        <p
          css={{
            margin: "10px 0",
            fontSize: "0.75rem",
            color: "#4a4a4a",
            lineHeight: "1.2",
          }}
        >
          In VOTE We TRUST
        </p>
      </div>
      <GlobalPanel />
      <div css={{ margin: "16px" }}>
        <NavBar />
      </div>
      {children}
      <Footer />
    </React.Fragment>
  )
}
