"use client"

import type React from "react"

import type { ProjectFolderProps } from "./types"
import { useProjectState } from "./hooks"
import { FailedProject } from "./failed-project"
import { DefaultProject } from "./default-project"
import { useGeneration, useGenerationState } from "../contexts/generation-context"
import { useEffect, useState } from "react"
import type { Project } from "@/lib/data"

export function ProjectFolder({
    project,
    index,
    generationDuration = 10000,
    onRemove,
    onClick,
    onRename,
}: ProjectFolderProps & {
    onRemove?: () => void
    onClick?: (project: Project) => void
    onCancel?: () => void
    onRename?: (newTitle: string) => void
}) {
    const { startGeneration } = useGeneration()
    const [isShaking, setIsShaking] = useState(false)

    const handleRename = (newTitle: string) => {
        onRename?.(newTitle)
    }
    const globalGenState = useGenerationState(project.id.toString())

    useEffect(() => {
        if (project.isGenerating && !globalGenState) {
            startGeneration(project.id.toString())
        }
    }, [project.isGenerating, project.id, globalGenState, startGeneration])

    const internalState = useProjectState({
        project,
        index,
        generationDuration,
    })

    const state =
        project.isGenerating && globalGenState
            ? {
                ...internalState,
                progress: globalGenState.progress,
                sparklesFading: globalGenState.sparklesFading,
                showImages: globalGenState.showImages,
                generationComplete: globalGenState.generationComplete,
                showGeneratingFooter: globalGenState.showGeneratingFooter,
                remainingEta: globalGenState.remainingEta,
                isGenerating: Boolean(project.isGenerating) && !globalGenState.generationComplete,
            }
            : internalState

    const handleClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("[data-menu]")) return
        if (project.isFailed) return
        if (project.isGenerating && !state.generationComplete) return

        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 500)
        onClick?.(project)
    }

    if (project.isFailed) {
        return (
            <FailedProject
                project={project}
                isHovered={state.isHovered}
                setIsHovered={state.setIsHovered}
                onRemove={onRemove}
            />
        )
    }

    return (
        <div
            onClick={handleClick}
            className={`relative ${isShaking ? "animate-shake" : ""}`}
            style={{
                transformOrigin: "center center",
                zIndex: isShaking ? 100 : "auto",
            }}
        >
            <DefaultProject
                project={project}
                isHovered={state.isHovered}
                setIsHovered={state.setIsHovered}
                isGenerating={state.isGenerating}
                progress={state.progress}
                sparklesFading={state.sparklesFading}
                showImages={state.showImages}
                imagePositions={state.imagePositions}
                clipCount={state.clipCount}
                remainingEta={state.remainingEta}
                onRemove={onRemove}
                onRename={handleRename}
            />
        </div>
    )
}
