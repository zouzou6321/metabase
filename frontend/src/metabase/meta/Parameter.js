/* @flow */

import type { TemplateTag } from "./types/Query";
import type { Parameter } from "./types/Dashboard";

export function getTemplateTagParameters(tags: TemplateTag[]): Parameter[] {
    return tags.filter(tag => tag.type != null && tag.type !== "dimension")
        .map(tag => ({
            id: tag.id,
            type: tag.type === "date" ? "date/single" : "category",
            target: ["variable", ["template-tag", tag.name]],
            name: tag.display_name,
            slug: tag.name,
            default: tag.default
        }))
}

export function getTimeseriesParameters(card, tableMetadata): Parameter[] {
    // TODO: use query lib
    const dimension = card.dataset_query.query.breakout[0];
    return [{
        id: "TIMESERIES",
        type: "date/range",
        target: ["dimension", dimension],
        name: "",
        slug: "date"
    }]
}
