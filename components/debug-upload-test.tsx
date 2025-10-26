"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { uploadImage, uploadImagesFromFormData } from '@/lib/file-upload'

export function DebugUploadTest() {
  const [testResults, setTestResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testSingleUpload = async () => {
    addResult('Starting single upload test...')
    
    // Create a dummy file
    const dummyFile = new File(['dummy content'], 'test-image.png', { type: 'image/png' })
    addResult(`Created dummy file: ${dummyFile.name}, size: ${dummyFile.size}, type: ${dummyFile.type}`)
    
    try {
      const result = await uploadImage(dummyFile)
      addResult(`Single upload result: ${result || 'null'}`)
    } catch (error) {
      addResult(`Single upload error: ${error}`)
    }
  }

  const testFormDataUpload = async () => {
    addResult('Starting FormData upload test...')
    
    // Create FormData with dummy files
    const formData = new FormData()
    const dummyFile1 = new File(['dummy content 1'], 'test-image-1.png', { type: 'image/png' })
    const dummyFile2 = new File(['dummy content 2'], 'test-thumbnail-1.jpg', { type: 'image/jpeg' })
    
    formData.append('image', dummyFile1)
    formData.append('thumbnail', dummyFile2)
    formData.append('title', 'Test Blog Post')
    formData.append('content', 'Test content')
    
    addResult(`FormData entries:`)
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        addResult(`  ${key}: File - ${value.name}, size: ${value.size}, type: ${value.type}`)
      } else {
        addResult(`  ${key}: ${value}`)
      }
    }
    
    try {
      const result = await uploadImagesFromFormData(formData, ['image', 'thumbnail'])
      addResult(`FormData upload result: ${JSON.stringify(result)}`)
    } catch (error) {
      addResult(`FormData upload error: ${error}`)
    }
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg border border-blue-700/30">
      <h3 className="text-xl font-bold text-red-400 mb-4">Upload Debug Test</h3>
      
      <div className="space-y-4 mb-6">
        <Button onClick={testSingleUpload} className="mr-2">
          Test Single Upload
        </Button>
        <Button onClick={testFormDataUpload} className="mr-2">
          Test FormData Upload
        </Button>
        <Button onClick={clearResults} variant="outline">
          Clear Results
        </Button>
      </div>
      
      <div className="bg-gray-900 p-4 rounded-lg">
        <h4 className="text-blue-200 font-semibold mb-2">Test Results:</h4>
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-gray-400">No test results yet. Click a test button above.</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="text-sm text-blue-300 font-mono">
                {result}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
