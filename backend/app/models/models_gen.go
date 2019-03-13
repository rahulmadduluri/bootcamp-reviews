// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

type School struct {
	UUID              string   `json:"uuid"`
	Name              string   `json:"name"`
	AvgGraduateSalary *float64 `json:"avgGraduateSalary"`
	AcceptanceRate    *float64 `json:"acceptanceRate"`
	JobPlacementRate  *float64 `json:"jobPlacementRate"`
	LengthInWeeks     *int     `json:"lengthInWeeks"`
	IsOnline          *bool    `json:"isOnline"`
	City              *string  `json:"city"`
	Country           *string  `json:"country"`
	PhotoURI          *string  `json:"photoURI"`
	Tracks            []Track  `json:"tracks"`
	Tuition           *Tuition `json:"tuition"`
}

type SchoolSearchParams struct {
	Country                         *string `json:"country"`
	Track                           *string `json:"track"`
	TuitionPaymentType              *string `json:"tuitionPaymentType"`
	SortByTuitionLowToHigh          *bool   `json:"sortByTuitionLowToHigh"`
	SortByTuitionHighToLow          *bool   `json:"sortByTuitionHighToLow"`
	SortByGraduateSalaryHighToLow   *bool   `json:"sortByGraduateSalaryHighToLow"`
	SortByJobPlacementRateHighToLow *bool   `json:"sortByJobPlacementRateHighToLow"`
	MinLength                       *int    `json:"minLength"`
	IsOnline                        *bool   `json:"isOnline"`
}

type Track struct {
	UUID string `json:"uuid"`
	Name string `json:"name"`
}

type Tuition struct {
	UUID        string `json:"uuid"`
	Name        string `json:"name"`
	BasePrice   int    `json:"basePrice"`
	PaymentType string `json:"paymentType"`
}
