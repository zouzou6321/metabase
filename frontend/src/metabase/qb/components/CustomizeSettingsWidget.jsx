/* @flow */

import React, { Component, PropTypes } from "react";

import ModalWithTrigger from "metabase/components/ModalWithTrigger.jsx";
import ChartSettings
    from "metabase/visualizations/components/ChartSettings.jsx";

type Props = {};

const CustomizeSettingsWidget = (
    { card, result, onReplaceAllVisualizationSettings }: Props
) => card && result
        ? <ModalWithTrigger
              wide
              tall
              triggerElement={
                  <span data-metabase-event="Query Builder;Chart Settings">
                      Customize
                  </span>
              }
              triggerClasses="text-brand-hover text-bold text-grey-4"
          >
              <ChartSettings
                  series={[{ card: card, data: result.data }]}
                  onChange={onReplaceAllVisualizationSettings}
              />
          </ModalWithTrigger>
        : null;

export default CustomizeSettingsWidget;
