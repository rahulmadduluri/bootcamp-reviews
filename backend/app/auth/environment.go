package auth

import (
	"os"
)

const (
	_EnvironmentKey = "APP_ENV"
	_PlaygroundEnv  = "playground" // for local testing
	_ProductionEnv  = "production"
)

func IsEnvProd() bool {
	return os.Getenv(_EnvironmentKey) == _ProductionEnv
}

func IsEnvPlayground() bool {
	return os.Getenv(_EnvironmentKey) == _PlaygroundEnv
}
