// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

type CampusLocation struct {
	Location             Location `json:"location"`
	MedianGraduateSalary *float64 `json:"medianGraduateSalary"`
	JobPlacementRate     *float64 `json:"jobPlacementRate"`
}

type CreateStudentInput struct {
	UUID             string `json:"uuid"`
	FirstName        string `json:"firstName"`
	LastName         string `json:"lastName"`
	Email            string `json:"email"`
	LinkedInPhotoURL string `json:"linkedInPhotoURL"`
}

type Filters struct {
	Locations    []Location `json:"locations"`
	PaymentTypes []string   `json:"paymentTypes"`
	MinLengths   []int      `json:"minLengths"`
	MaxPrices    []int      `json:"maxPrices"`
}

type Location struct {
	UUID    string  `json:"uuid"`
	City    *string `json:"city"`
	Country string  `json:"country"`
}

type Review struct {
	UUID                      string    `json:"uuid"`
	AllText                   string    `json:"allText"`
	TeachingScore             int       `json:"teachingScore"`
	CourseworkScore           int       `json:"courseworkScore"`
	AtmosphereScore           int       `json:"atmosphereScore"`
	CareerPreparationScore    int       `json:"careerPreparationScore"`
	OverallScore              float64   `json:"overallScore"`
	HelpfulCount              int       `json:"helpfulCount"`
	HasJob                    bool      `json:"hasJob"`
	SalaryBefore              *int      `json:"salaryBefore"`
	SalaryAfter               *int      `json:"salaryAfter"`
	School                    School    `json:"school"`
	SchoolLocation            Location  `json:"schoolLocation"`
	SchoolGraduationTimestamp *int      `json:"schoolGraduationTimestamp"`
	JobLocation               *Location `json:"jobLocation"`
	JobStartTimestamp         *int      `json:"jobStartTimestamp"`
	CreatedTimestamp          int       `json:"createdTimestamp"`
}

type School struct {
	UUID            string           `json:"uuid"`
	Name            string           `json:"name"`
	LengthInWeeks   *int             `json:"lengthInWeeks"`
	IsOnline        *bool            `json:"isOnline"`
	BasePrice       *int             `json:"basePrice"`
	PaymentType     *string          `json:"paymentType"`
	PhotoURI        *string          `json:"photoURI"`
	CampusLocations []CampusLocation `json:"campusLocations"`
}

type SchoolQueryResult struct {
	TotalNumResults int      `json:"totalNumResults"`
	PageNumber      int      `json:"pageNumber"`
	SchoolResults   []School `json:"schoolResults"`
}

type SchoolSearchParams struct {
	PageNumber          int      `json:"pageNumber"`
	SearchText          *string  `json:"searchText"`
	LocationUUID        *string  `json:"locationUUID"`
	PaymentType         *string  `json:"paymentType"`
	MaxPrice            *int     `json:"maxPrice"`
	MinGraduateSalary   *float64 `json:"minGraduateSalary"`
	MinJobPlacementRate *float64 `json:"minJobPlacementRate"`
	MinLength           *int     `json:"minLength"`
}

type Student struct {
	UUID             string  `json:"uuid"`
	FirstName        string  `json:"firstName"`
	LastName         string  `json:"lastName"`
	PhotoURI         *string `json:"photoURI"`
	LinkedInPhotoURL *string `json:"linkedInPhotoURL"`
	School           *School `json:"school"`
}

type UpdateStudentInput struct {
	UUID        string  `json:"uuid"`
	FirstName   *string `json:"firstName"`
	LastName    *string `json:"lastName"`
	Email       *string `json:"email"`
	LinkedInURL *string `json:"linkedInURL"`
	SchoolUUID  *string `json:"schoolUUID"`
}
