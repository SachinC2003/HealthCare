"use client"

import React, { useEffect, useState } from "react"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getPayments(): Promise<Payment[]> {
  // In a real application, you would fetch this data from your API
  // For now, we'll return mock data
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489dd1f3",
      amount: 75,
      status: "processing",
      email: "john@example.com",
    },
    {
      id: "590ae1g7",
      amount: 200,
      status: "success",
      email: "sara@example.com",
    },
    // Add more sample or fetched data here if needed.
  ]
}

export default function PaymentDemoPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPayments()
        setPayments(data)
      } catch (error) {
        console.error("Error fetching payments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPayments()
  }, [])

  if (isLoading) {
    return <div className="container mx-auto py-10">Loading payments...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      {payments.length > 0 ? (
        <DataTable columns={columns} data={payments} />
      ) : (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">No Payments Found</h2>
          <p className="text-gray-600">There are no recorded payments at this time.</p>
        </section>
      )}
    </div>
  )
}