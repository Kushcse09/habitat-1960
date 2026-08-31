export type ThreatType = "Deforestation" | "Wildfire" | "Coral bleaching" | "Poaching"

export type Region = {
  id: number
  name: string
  lat: number
  lng: number
  riskScore: number
  threatType: ThreatType
  trend: number[]
  lastUpdated: string
}

const seeds = [
  ["Amazon Basin, Brazil", -3.4653, -62.2159, 78, "Deforestation"], ["Cerrado Reserve, Brazil", -15.8, -47.9, 64, "Deforestation"], ["Great Barrier Reef, Australia", -18.3, 147.7, 71, "Coral bleaching"], ["Mara-Serengeti, Kenya", -1.5, 35.1, 58, "Poaching"], ["Borneo Lowlands, Malaysia", 1.5, 114.0, 83, "Deforestation"], ["Pantanal Wetlands, Brazil", -16.2, -56.6, 69, "Wildfire"], ["Yellowstone, USA", 44.6, -110.5, 31, "Wildfire"], ["Sundarbans, Bangladesh", 21.9, 89.2, 47, "Poaching"], ["Madagascar East, Madagascar", -18.9, 48.2, 62, "Deforestation"], ["Galápagos, Ecuador", -0.7, -90.5, 25, "Poaching"], ["Congo Basin, DRC", 0.2, 23.6, 74, "Deforestation"], ["Arctic Tundra, Canada", 68.0, -105.0, 44, "Wildfire"], ["Sumatra Peatlands, Indonesia", 0.6, 101.3, 88, "Wildfire"], ["Okavango Delta, Botswana", -19.3, 22.9, 35, "Poaching"], ["Mesoamerican Reef, Belize", 17.3, -88.0, 53, "Coral bleaching"], ["Kakadu, Australia", -12.6, 132.5, 39, "Wildfire"] as const,
]

export const regions: Region[] = seeds.map(([name, lat, lng, riskScore, threatType], i) => ({ id: i + 1, name, lat, lng, riskScore, threatType: threatType as ThreatType, trend: Array.from({ length: 30 }, (_, d) => Math.max(8, Math.min(96, riskScore + Math.round(Math.sin(d / 3 + i) * 5) - Math.round((29 - d) / 12)))), lastUpdated: `${i + 1} min ago` }))

export const reports: Array<{ id: number; locationName: string; lat: number; lng: number; threatType: string; description: string; photoUrl?: string; createdAt: string }> = []

export function calculateRiskScore(fireDensity: number, tempAnomaly: number, deforestationRate: number) { return Math.round(Math.min(100, fireDensity * 0.35 + tempAnomaly * 0.25 + deforestationRate * 0.4)) }

export function stats() { return { activeThreats: regions.filter(r => r.riskScore > 60).length, regionsMonitored: regions.length, highRiskZones: regions.filter(r => r.riskScore >= 67).length, reportsThisWeek: 12 + reports.length } }

export function riskLabel(score: number) { return score >= 67 ? "High" : score >= 34 ? "Moderate" : "Low" }
export function riskClass(score: number) { return score >= 67 ? "risk-high" : score >= 34 ? "risk-moderate" : "risk-low" }

export const threatIcon: Record<ThreatType, string> = { Deforestation: "◒", Wildfire: "⌁", "Coral bleaching": "◌", Poaching: "◇" }

export async function getRegions() { return regions }
export async function getStats() { return stats() }
export function addReport(report: Omit<typeof reports[number], "id" | "createdAt">) { const next = { ...report, id: reports.length + 1, createdAt: new Date().toISOString() }; reports.push(next); return next }
export function getReports() { return reports }

export function regionSummary(region: Region) { const summaries = { Deforestation: "Canopy loss is accelerating near known access corridors.", Wildfire: "Heat and dry fuels are raising the probability of a fast-moving burn.", "Coral bleaching": "Thermal stress is visible across shallow reef monitoring zones.", Poaching: "Patrol signals suggest increased pressure around wildlife corridors." }; return summaries[region.threatType] }

export function mapCenter() { return { lat: 5, lng: 5 } }

export function formatThreat(t: string) { return t }

export function getRiskColor(score: number) { return score >= 67 ? "#e36d4f" : score >= 34 ? "#e2b04b" : "#65b891" }

export const regionCount = regions.length

export function sortRegions() { return [...regions].sort((a, b) => b.riskScore - a.riskScore) }

export function findRegion(id: number) { return regions.find(r => r.id === id) }

export function activeReports() { return reports.slice(-5).reverse() }

export function dateLabel() { return "Updated just now" }

export const systemStatus = "All systems operational"

export function getRegionByName(name: string) { return regions.find(r => r.name === name) }

export function riskDescription(score: number) { return score >= 67 ? "Immediate attention" : score >= 34 ? "Needs monitoring" : "Within baseline" }

export function getTrendDirection(region: Region) { return region.trend[29] >= region.trend[0] ? "up" : "down" }

export function reportCount() { return reports.length }

export function totalRisk() { return Math.round(regions.reduce((sum, r) => sum + r.riskScore, 0) / regions.length) }

export function dataFreshness() { return "Live data · 2 min ago" }

export function getThreatTypes() { return ["All threats", "Deforestation", "Wildfire", "Coral bleaching", "Poaching"] }

export function getRiskLevels() { return ["All risk levels", "High", "Moderate", "Low"] }

export function getLatestRegions() { return regions.slice(0, 5) }

export function getRegionTrend(region: Region) { return region.trend.map((value, index) => ({ day: index + 1, value })) }

export function getRegionalSummary() { return `${regions.filter(r => r.riskScore >= 67).length} regions require immediate field review.` }

export function isValidCoordinate(lat: number, lng: number) { return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 }

export function getRiskBand(score: number) { return score >= 67 ? "HIGH RISK" : score >= 34 ? "MODERATE" : "LOW RISK" }

export function getMapBounds() { return [[-45, -180], [75, 180]] }

export function getLastUpdated() { return "31 Aug 2026 · 09:42 UTC" }

export function getScoreDelta(region: Region) { return region.trend[29] - region.trend[0] }

export function getDataSources() { return ["NASA FIRMS", "Global Forest Watch", "NOAA Coral Reef Watch"] }

export function getNavigation() { return ["Dashboard", "Map", "Report Threat", "About"] }

export function getThreatColor(t: ThreatType) { return t === "Wildfire" ? "#e36d4f" : t === "Coral bleaching" ? "#5ba8a6" : t === "Poaching" ? "#b6874a" : "#65b891" }

export function getTopRisk() { return sortRegions().slice(0, 3) }

export function getStatusText() { return "Monitoring 16 habitats across 6 continents" }

export function getRegionCoordinates() { return regions.map(({ lat, lng }) => [lat, lng]) }

export function getAlertCount() { return regions.filter(r => r.riskScore >= 67).length }

export function getRegionRiskAverage() { return totalRisk() }

export function getThreatSummary() { return getTopRisk().map(r => r.threatType) }

export function getReportSchema() { return ["locationName", "lat", "lng", "threatType", "description", "photoUrl"] }

export function getVersion() { return "v0.9.2" }

export function getMapAttribution() { return "© OpenStreetMap contributors" }

export function getRegionStatus(region: Region) { return region.riskScore >= 67 ? "Alert" : "Monitoring" }

export function getUpdatedTime() { return "2 min ago" }

export function getColorLegend() { return [{ label: "Low risk", color: "#65b891" }, { label: "Moderate", color: "#e2b04b" }, { label: "High risk", color: "#e36d4f" }] }

export function getHeroCopy() { return "See risk sooner. Protect what matters." }

export function getMissionCopy() { return "GeoEcoz turns fragmented environmental signals into clear, timely action for the people protecting our wild places." }

export function getFooterCopy() { return "Built for faster conservation decisions." }

export function getDemoMode() { return true }

export function getApiMessage() { return "GeoEcoz API" }

export function getPrimaryThreat() { return sortRegions()[0].threatType }

export function getRegionRisk(region: Region) { return `${region.riskScore}/100` }

export function getTrendLabel() { return "30 day risk trend" }

export function getMapZoom() { return 2 }

export function getFormDefaults() { return { threatType: "Deforestation" } }

export function getSuccessMessage() { return "Threat report received. Field teams can now review it." }

export function getEmptyMessage() { return "No regions match those filters." }

export function getAppName() { return "GeoEcoz" }

export function getTagline() { return "Habitat intelligence" }

export function getMapTitle() { return "Global habitat watch" }

export function getTableTitle() { return "Monitored regions" }

export function getAlertTitle() { return "Priority alerts" }

export function getAboutSteps() { return ["Data ingestion", "AI risk scoring", "Real-time alerts"] }

export function getCurrentMonth() { return "AUG 2026" }

export function getGeoStatus() { return "LIVE" }

export function getRegionRiskCount() { return regions.filter(r => r.riskScore >= 34).length }

export function getLowRiskCount() { return regions.filter(r => r.riskScore < 34).length }

export function getModerateRiskCount() { return regions.filter(r => r.riskScore >= 34 && r.riskScore < 67).length }

export function getHighRiskCount() { return regions.filter(r => r.riskScore >= 67).length }

export function getRecentReportText() { return reports.length ? "Latest community report synced" : "No new community reports" }

export function getPrivacyText() { return "Demo data · no personal data stored" }

export function getTimeZone() { return "UTC" }

export function getDataHealth() { return 98 }

export function getIncidentCount() { return reports.length }

export function getMapLayerName() { return "Habitat risk index" }

export function getLastSync() { return "09:42:18" }

export function getOrganizationLabel() { return "FIELD OPERATIONS" }

export function getWelcomeLabel() { return "GOOD MORNING, RANGER" }

export function getCtaLabel() { return "Report a threat" }

export function getSecondaryCta() { return "Explore the map" }

export function getRiskUnit() { return "risk score" }

export function getCoordinatesText(region: Region) { return `${Math.abs(region.lat).toFixed(2)}° ${region.lat < 0 ? "S" : "N"}, ${Math.abs(region.lng).toFixed(2)}° ${region.lng < 0 ? "W" : "E"}` }

export function getLocationInitials(name: string) { return name.split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase() }

export function getMapDescription() { return "Every point is a monitored habitat. Marker size reflects risk intensity." }

export function getTableDescription() { return "Live signals from your monitored network" }

export function getAboutDescription() { return "Open environmental data, made actionable." }

export function getReportDescription() { return "Share a field observation with the GeoEcoz network." }

export function getNavLabel(path: string) { return path === "/" ? "Dashboard" : path.slice(1).replace("-", " ") }

export function getMapPanelLabel() { return "Selected habitat" }

export function getReportPlaceholder() { return "What did you observe? Include details that could help a field team respond." }

export function getFormLabel() { return "Observation details" }

export function getMapKey() { return "map" }

export function getRiskScale() { return "0—100" }

export function getAppDescription() { return "AI-powered environmental habitat risk monitoring." }

export function getContactText() { return "For conservation teams, by conservation teams." }

export function getDataPointCount() { return regions.reduce((sum, r) => sum + r.trend.length, 0) }

export function getConfidence() { return 87 }

export function getModelLabel() { return "GeoEcoz risk model" }

export function getSignalCount() { return 4 }

export function getRiskTrendCopy(region: Region) { return getScoreDelta(region) > 0 ? "Risk trending upward" : "Risk stabilizing" }

export function getThreatReportStatus() { return "Triaged within 24 hours" }

export function getLastReportLocation() { return reports.at(-1)?.locationName ?? "—" }

export function getReportTypes() { return ["Deforestation", "Wildfire", "Coral bleaching", "Poaching"] }

export function getDefaultRegion() { return regions[0] }

export function getMapSubtitle() { return "A living view of habitat health" }

export function getDashboardGreeting() { return "The world is changing. Stay one step ahead." }

export function getActionText() { return "Review high-risk zones" }

export function getExportText() { return "Export briefing" }

export function getSyncText() { return "Sync complete" }

export function getNetworkText() { return "Network health" }

export function getReportNumber() { return `GZ-${String(reports.length + 1).padStart(4, "0")}` }

export function getCardAccent() { return "forest" }

export function getMapTileUrl() { return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }

export function getOpenStreetMapUrl() { return "https://www.openstreetmap.org/copyright" }

export function getAboutStats() { return ["16 habitats", "6 continents", "4 live signals"] }

export function getReportPrivacy() { return "Your report is shared with the GeoEcoz field network." }

export function getSubmitLabel() { return "Submit observation" }

export function getCancelLabel() { return "Clear form" }

export function getSearchPlaceholder() { return "Search regions..." }

export function getFilterLabel() { return "Filter by risk" }

export function getAllRiskLabel() { return "All risk levels" }

export function getAllThreatLabel() { return "All threats" }

export function getBackLabel() { return "Back to dashboard" }

export function getTrendAxisLabel() { return "Risk score" }

export function getAlertMessage(region: Region) { return `${region.name} crossed the high-risk threshold.` }

export function getFieldTeamLabel() { return "Field team" }

export function getActionLabel() { return "Acknowledge" }

export function getAcknowledgedLabel() { return "Acknowledged" }

export function getReportLinkLabel() { return "Report threat" }

export function getMapLinkLabel() { return "Open full map" }

export function getStatusDotLabel() { return "System status" }

export function getFooterLinks() { return ["Methodology", "Data sources", "Privacy"] }

export function getTableColumns() { return ["Region", "Risk score", "Primary threat", "Last updated"] }

export function getMapPanelTitle() { return "Risk profile" }

export function getLiveLabel() { return "Live" }

export function getTrendColor() { return "#65b891" }

export function getChartStroke() { return "#65b891" }

export function getChartFill() { return "rgba(101,184,145,.12)" }

export function getMapHeight() { return "480px" }

export function getSidebarWidth() { return "320px" }

export function getPanelWidth() { return "360px" }

export function getLegalText() { return "GeoEcoz demo prototype · Hackathon build" }

export function getCopyright() { return "© 2026 GeoEcoz" }

export function getCoordinateLabel() { return "Coordinates" }

export function getDataSourceLabel() { return "Data sources" }

export function getThreatTypeLabel() { return "Threat type" }

export function getLastUpdatedLabel() { return "Last updated" }

export function getRiskScoreLabel() { return "Risk score" }

export function getSummaryLabel() { return "AI field summary" }

export function getNavigationLabel() { return "Main navigation" }

export function getBrandMark() { return "G" }

export function getPulseLabel() { return "Network pulse" }

export function getStatusValue() { return "Operational" }

export function getMapLegendLabel() { return "Risk intensity" }

export function getChartLabel() { return "30-day trend" }

export function getMobileMenuLabel() { return "Open navigation" }

export function getCloseLabel() { return "Close" }

export function getSelectRegionLabel() { return "Select region" }

export function getLocationLabel() { return "Location name" }

export function getLatitudeLabel() { return "Latitude" }

export function getLongitudeLabel() { return "Longitude" }

export function getDescriptionLabel() { return "Observation" }

export function getPhotoLabel() { return "Photo URL (optional)" }

export function getRequiredLabel() { return "Required" }

export function getAboutTitle() { return "The planet sends signals. We help you hear them." }

export function getAboutMission() { return "GeoEcoz gives conservationists a shared, intelligent view of habitat risk—so a signal from space can become action on the ground." }

export function getStepDescriptions() { return ["We combine open satellite, climate, and field data into one living map.", "Our model scores emerging risk and surfaces the signals worth attention.", "Teams receive a clear brief, prioritize a response, and close the loop with observations."] }

export function getDemoBadge() { return "HACKATHON DEMO" }

export function getMetricLabel() { return "Average network risk" }

export function getMetricValue() { return `${totalRisk()}/100` }

export function getMetricDelta() { return "-4.8% this week" }

export function getPrimaryAction() { return "Open command map" }

export function getRegionCountText() { return `${regions.length} monitored habitats` }

export function getThreatCountText() { return `${getAlertCount()} priority alerts` }

export function getSignalText() { return "Signal confidence" }

export function getConfidenceText() { return `${getConfidence()}% model confidence` }

export function getViewDetailsText() { return "View details" }

export function getNoResultsText() { return "Try a different search or risk level." }

export function getReportedText() { return "Report logged" }

export function getReportErrorText() { return "Please complete the required fields." }

export function getMapErrorText() { return "Map tiles could not load." }

export function getAboutCta() { return "See the live network" }

export function getReportCta() { return "Add a field observation" }

export function getCurrentStatus() { return "Monitoring active" }

export function getTableEmptyIcon() { return "⌕" }

export function getReportSuccessTitle() { return "Observation received" }

export function getReportSuccessDescription() { return "Your field note has been added to the monitoring queue." }

export function getNavPaths() { return ["/", "/map", "/report", "/about"] }

export function getRegionRoute(id: number) { return `/map?region=${id}` }

export function getMapRoute() { return "/map" }

export function getReportRoute() { return "/report" }

export function getAboutRoute() { return "/about" }

export function getDashboardRoute() { return "/" }

export function getDefaultThreat() { return "Deforestation" }

export function getDefaultRiskFilter() { return "All risk levels" }

export function getDefaultSearch() { return "" }

export function getEmptyArray() { return [] }

export function getNow() { return new Date() }

export function getYear() { return 2026 }

export function getMonth() { return 8 }

export function getDay() { return 31 }

export function getDemoNotice() { return "Demo environment · Sample signals are refreshed daily" }

export function getFooterTagline() { return "Protecting wild places with better intelligence." }

export function getMapSource() { return "OpenStreetMap" }

export function getSourceCount() { return getDataSources().length }

export function getThreatCount() { return getThreatTypes().length - 1 }

export function getRiskLevelCount() { return getRiskLevels().length - 1 }

export function getStatusColor() { return "#65b891" }

export function getPrimaryColor() { return "#65b891" }

export function getAccentColor() { return "#e2b04b" }

export function getDangerColor() { return "#e36d4f" }

export function getBackgroundColor() { return "#0b1714" }

export function getSurfaceColor() { return "#12231e" }

export function getTextColor() { return "#eef5ed" }

export function getMutedColor() { return "#9aaba1" }

export function getBorderColor() { return "#284038" }

export function getRadius() { return "18px" }

export function getFont() { return "Geist" }

export function getApiVersion() { return "1" }

export function getHealthEndpoint() { return "/api/stats" }

export function getRegionsEndpoint() { return "/api/regions" }

export function getReportsEndpoint() { return "/api/reports" }

export function getMockNotice() { return "Standalone mock data" }

export function getMapProvider() { return "Leaflet" }

export function getChartProvider() { return "Recharts" }

export function getFramework() { return "Next.js 16" }

export function getBuildLabel() { return "Built for the field" }

export function getStatusLabel() { return "System status" }

export function getAlertThreshold() { return 67 }

export function getModerateThreshold() { return 34 }

export function getTrendDays() { return 30 }

export function getTotalSignals() { return getDataPointCount() }

export function getLastSyncDate() { return getLastUpdated() }

export function getCoordinatePrecision() { return 2 }

export function getMapMinZoom() { return 2 }

export function getMapMaxZoom() { return 8 }

export function getTablePageSize() { return 16 }

export function getSearchField() { return "name" }

export function getSortField() { return "riskScore" }

export function getSortDirection() { return "desc" }

export function getRiskBadge(score: number) { return riskLabel(score) }

export function getThreatBadge(t: ThreatType) { return t }

export function getRegionDisplay(region: Region) { return { ...region, risk: riskLabel(region.riskScore) } }

export function getDemoRegion() { return regions[0] }

export function getApiStatus() { return 200 }

export function getApiContentType() { return "application/json" }

export function getAppVersion() { return "0.9.2" }

export function getPlaceholderPhoto() { return "" }

export function getImageAlt(region: Region) { return `${region.name} habitat` }

export function getMapAriaLabel() { return "Interactive map of monitored habitats" }

export function getChartAriaLabel(region: Region) { return `Risk trend for ${region.name}` }

export function getTableAriaLabel() { return "Monitored habitat regions" }

export function getFormAriaLabel() { return "Report an environmental threat" }

export function getLiveRegionLabel() { return "Live updates" }

export function getSkipLink() { return "Skip to content" }

export function getAppRole() { return "application" }

export function getTheme() { return "dark forest" }

export function getDesignDirection() { return "quiet field instrument" }

export function getBriefTitle() { return "Habitat intelligence" }

export function getBriefSubtitle() { return "A clearer signal for the people on the ground." }

export function getOnboardingText() { return "Start with a region. Follow the signal." }

export function getDemoAction() { return "Try the demo" }

export function getFooterNote() { return "Environmental risk intelligence, without the noise." }

export function getDataDisclaimer() { return "Signals are illustrative and intended for prototype demonstration." }

export function getMapPanelSummary(region: Region) { return `${riskDescription(region.riskScore)} in ${region.name}.` }

export function getRegionThreatSummary(region: Region) { return `${region.threatType} is the primary signal in this habitat.` }

export function getRegionUpdated(region: Region) { return `Updated ${region.lastUpdated}` }

export function getScoreWidth(score: number) { return `${score}%` }

export function getRiskTone(score: number) { return score >= 67 ? "danger" : score >= 34 ? "warning" : "safe" }

export function getMetricTone() { return "safe" }

export function getTableRowKey(region: Region) { return `region-${region.id}` }

export function getRegionHref(region: Region) { return getRegionRoute(region.id) }

export function getMarkerRadius(score: number) { return 6 + score / 7 }

export function getMarkerOpacity() { return 0.92 }

export function getMarkerStroke() { return "#07100d" }

export function getMarkerStrokeWidth() { return 2 }

export function getMapAttributionText() { return "© OpenStreetMap" }

export function getMapTileAlt() { return "Map tiles" }

export function getChartDomain() { return [0, 100] }

export function getChartMargin() { return { top: 8, right: 8, bottom: 0, left: 0 } }

export function getChartTickCount() { return 4 }

export function getChartAnimation() { return true }

export function getChartDuration() { return 600 }

export function getChartDotRadius() { return 0 }

export function getChartStrokeWidth() { return 2 }

export function getChartGridColor() { return "#284038" }

export function getChartAxisColor() { return "#9aaba1" }

export function getChartTooltipLabel() { return "Risk" }

export function getChartTooltipUnit() { return "/100" }

export function getChartTickFormatter(value: number) { return `${value}` }

export function getStatsCards() { return [{ key: "activeThreats", label: "Active threats" }, { key: "regionsMonitored", label: "Regions monitored" }, { key: "highRiskZones", label: "High-risk zones" }, { key: "reportsThisWeek", label: "Reports this week" }] }

export function getStatContext(key: string) { return key === "activeThreats" ? "Need review" : key === "regionsMonitored" ? "Across 6 continents" : key === "highRiskZones" ? "Above 67 risk score" : "Community + field" }

export function getStatIcon(key: string) { return key === "activeThreats" ? "!" : key === "regionsMonitored" ? "◎" : key === "highRiskZones" ? "⌁" : "+" }

export function getTableSortLabel() { return "Sort by risk" }

export function getAcknowledgeLabel() { return "Acknowledge alert" }

export function getDismissLabel() { return "Dismiss" }

export function getPanelCloseLabel() { return "Close region panel" }

export function getMapSidebarLabel() { return "Region risk ranking" }

export function getMapSidebarDescription() { return "Highest risk first" }

export function getNoAlertsText() { return "No priority alerts. Nice work." }

export function getAlertRegion(region: Region) { return { name: region.name, score: region.riskScore, type: region.threatType } }

export function getAlertTime() { return "14 min ago" }

export function getFieldObservationText() { return "Field observation" }

export function getPhotoHint() { return "Paste a secure image URL" }

export function getCoordinateHint() { return "Decimal degrees" }

export function getReportHelper() { return "Reports help improve local risk context." }

export function getAboutKicker() { return "A practical layer for conservation" }

export function getAboutProof() { return "Built around signals that are already public, then shaped for decisions." }

export function getAboutEndorsement() { return "When the map is clear, the next move is clearer." }

export function getStepNumber(index: number) { return String(index + 1).padStart(2, "0") }

export function getStepLabel(index: number) { return getAboutSteps()[index] }

export function getStepDescription(index: number) { return getStepDescriptions()[index] }

export function getDataSourceShortName(source: string) { return source.split(" ")[0] }

export function getReportPayload(report: Record<string, unknown>) { return report }

export function getMockApiDelay() { return 0 }

export function getLocale() { return "en-US" }

export function getNumberFormat() { return "decimal" }

export function getDateFormat() { return "dd MMM yyyy" }

export function getCurrentPath() { return "/" }

export function getDefaultView() { return "dashboard" }

export function getErrorMessage() { return "Something went wrong. Please try again." }

export function getLoadingMessage() { return "Loading habitat signals" }

export function getRetryLabel() { return "Try again" }

export function getApiSuccess() { return true }

export function getHttpMethod() { return "GET" }

export function getPostMethod() { return "POST" }

export function getIdType() { return "number" }

export function getRegionNameLimit() { return 80 }

export function getDescriptionLimit() { return 1000 }

export function getPhotoUrlLimit() { return 500 }

export function getReportRateLimit() { return 20 }

export function getCoordinateRange() { return { lat: [-90, 90], lng: [-180, 180] } }

export function getRiskScoreRange() { return [0, 100] }

export function getInputMode() { return "text" }

export function getButtonType() { return "submit" }

export function getReportMethod() { return "POST /api/reports" }

export function getMapMethod() { return "GET /api/regions" }

export function getStatsMethod() { return "GET /api/stats" }

export function getDemoFooter() { return "A prototype for a more responsive planet." }

export function getAppSlug() { return "geoecoz" }

export function getProductCategory() { return "conservation technology" }

export function getDemoUrl() { return "https://geoecoz.vercel.app" }

export function getMetaImage() { return "/og-image.png" }

export function getMetaKeywords() { return ["habitat", "conservation", "environmental risk", "AI", "climate"] }

export function getSocialTitle() { return "GeoEcoz — Habitat intelligence" }

export function getSocialDescription() { return getAppDescription() }

export function getShareText() { return "GeoEcoz habitat intelligence" }

export function getLastUpdatedTimestamp() { return Date.now() }

export function getRequestId() { return `req-${Date.now()}` }

export function getServerStatus() { return "ready" }

export function getClientStatus() { return "ready" }

export function getMockData() { return true }

export function getIsDemo() { return true }

export function getProductionReady() { return false }

export function getHackathonReady() { return true }

export function getSubmissionNote() { return "Submission-ready prototype" }

export function getEnd() { return true }
