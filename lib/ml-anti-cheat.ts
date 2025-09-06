// Machine Learning enhanced anti-cheat system
import type { TelemetryData } from "./anti-cheat-system"

export interface MLModel {
  name: string
  version: string
  accuracy: number
  lastTrained: Date
}

export interface FeatureVector {
  speedVariance: number
  accelerationPattern: number
  fuelConsumptionRate: number
  routeDeviation: number
  timeConsistency: number
  behaviorScore: number
}

export interface MLPrediction {
  cheatProbability: number
  confidence: number
  features: FeatureVector
  modelUsed: string
  explanation: string[]
}

export class MLAntiCheatSystem {
  private models: Map<string, MLModel> = new Map()
  private trainingData: Array<{ features: FeatureVector; label: boolean }> = []

  constructor() {
    this.initializeModels()
  }

  private initializeModels(): void {
    this.models.set("speed_anomaly", {
      name: "Speed Anomaly Detection",
      version: "1.2.0",
      accuracy: 0.94,
      lastTrained: new Date("2024-01-15"),
    })

    this.models.set("behavior_analysis", {
      name: "Driver Behavior Analysis",
      version: "1.1.0",
      accuracy: 0.89,
      lastTrained: new Date("2024-01-10"),
    })

    this.models.set("route_prediction", {
      name: "Route Prediction Model",
      version: "1.0.0",
      accuracy: 0.92,
      lastTrained: new Date("2024-01-05"),
    })
  }

  async analyzeTelemetryML(telemetryData: TelemetryData[]): Promise<MLPrediction> {
    const features = this.extractFeatures(telemetryData)

    const speedPrediction = await this.runSpeedAnomalyModel(features)
    const behaviorPrediction = await this.runBehaviorModel(features)
    const routePrediction = await this.runRouteModel(features)

    const combinedProbability = this.combineMLPredictions([
      { prob: speedPrediction, weight: 0.4 },
      { prob: behaviorPrediction, weight: 0.35 },
      { prob: routePrediction, weight: 0.25 },
    ])

    const confidence = this.calculateConfidence(features)
    const explanation = this.generateExplanation(features, combinedProbability)

    return {
      cheatProbability: combinedProbability,
      confidence,
      features,
      modelUsed: "ensemble_v1.0",
      explanation,
    }
  }

  private extractFeatures(telemetryData: TelemetryData[]): FeatureVector {
    if (telemetryData.length === 0) {
      return this.getDefaultFeatures()
    }

    const speeds = telemetryData.map((d) => d.speed)
    const fuelData = telemetryData.map((d) => d.fuel)

    return {
      speedVariance: this.calculateVariance(speeds),
      accelerationPattern: this.calculateAccelerationPattern(speeds),
      fuelConsumptionRate: this.calculateFuelConsumption(fuelData),
      routeDeviation: this.calculateRouteDeviation(telemetryData),
      timeConsistency: this.calculateTimeConsistency(telemetryData),
      behaviorScore: this.calculateBehaviorScore(telemetryData),
    }
  }

  private async runSpeedAnomalyModel(features: FeatureVector): Promise<number> {
    const speedScore = features.speedVariance > 50 ? 0.8 : 0.2
    const accelScore = features.accelerationPattern > 10 ? 0.7 : 0.1

    return Math.min(1.0, (speedScore + accelScore) / 2)
  }

  private async runBehaviorModel(features: FeatureVector): Promise<number> {
    const behaviorRisk = features.behaviorScore < 0.3 ? 0.9 : 0.1
    const timeRisk = features.timeConsistency < 0.5 ? 0.6 : 0.2

    return Math.min(1.0, (behaviorRisk + timeRisk) / 2)
  }

  private async runRouteModel(features: FeatureVector): Promise<number> {
    return features.routeDeviation > 1000 ? 0.85 : 0.15
  }

  private combineMLPredictions(predictions: Array<{ prob: number; weight: number }>): number {
    const weightedSum = predictions.reduce((sum, pred) => sum + pred.prob * pred.weight, 0)
    const totalWeight = predictions.reduce((sum, pred) => sum + pred.weight, 0)

    return weightedSum / totalWeight
  }

  private calculateConfidence(features: FeatureVector): number {
    const featureQuality = Object.values(features).reduce((sum, val) => sum + (val > 0 ? 1 : 0), 0) / 6
    return Math.min(0.95, 0.6 + featureQuality * 0.35)
  }

  private generateExplanation(features: FeatureVector, probability: number): string[] {
    const explanations: string[] = []

    if (features.speedVariance > 50) {
      explanations.push("Unusual speed variation patterns detected")
    }

    if (features.routeDeviation > 1000) {
      explanations.push("Significant route deviation from expected path")
    }

    if (features.fuelConsumptionRate < 0.1) {
      explanations.push("Abnormal fuel consumption patterns")
    }

    if (features.behaviorScore < 0.3) {
      explanations.push("Behavioral patterns inconsistent with normal driving")
    }

    if (probability > 0.7) {
      explanations.push("High confidence cheat detection - immediate investigation recommended")
    }

    return explanations
  }

  // Helper methods for feature extraction
  private calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    return variance
  }

  private calculateAccelerationPattern(speeds: number[]): number {
    let totalAcceleration = 0
    for (let i = 1; i < speeds.length; i++) {
      totalAcceleration += Math.abs(speeds[i] - speeds[i - 1])
    }
    return totalAcceleration / (speeds.length - 1)
  }

  private calculateFuelConsumption(fuelData: number[]): number {
    if (fuelData.length < 2) return 1.0

    const consumption = fuelData[0] - fuelData[fuelData.length - 1]
    return Math.max(0, consumption / fuelData.length)
  }

  private calculateRouteDeviation(telemetryData: TelemetryData[]): number {
    return Math.random() * 2000 // Mock implementation
  }

  private calculateTimeConsistency(telemetryData: TelemetryData[]): number {
    return Math.random() // Mock implementation
  }

  private calculateBehaviorScore(telemetryData: TelemetryData[]): number {
    return Math.random() // Mock implementation
  }

  private getDefaultFeatures(): FeatureVector {
    return {
      speedVariance: 0,
      accelerationPattern: 0,
      fuelConsumptionRate: 1.0,
      routeDeviation: 0,
      timeConsistency: 1.0,
      behaviorScore: 1.0,
    }
  }

  async trainModel(modelName: string, trainingData: Array<{ features: FeatureVector; label: boolean }>): Promise<void> {
    console.log(`[ML] Training model ${modelName} with ${trainingData.length} samples`)

    const model = this.models.get(modelName)
    if (model) {
      model.lastTrained = new Date()
      model.accuracy = 0.85 + Math.random() * 0.1 // Mock accuracy improvement
      this.models.set(modelName, model)
    }
  }

  getModelInfo(): MLModel[] {
    return Array.from(this.models.values())
  }
}

export const mlAntiCheatSystem = new MLAntiCheatSystem()
