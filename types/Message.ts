export type Severity = 'error' | 'warning' | 'success'
export type ComplianceType = 'normal' | 'large'

export type Message = {
  severity: Severity
  severityText: string
  message: string
  elements: [string, HTMLElement][]
}