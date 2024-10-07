"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Loader2, RefreshCcw, Edit } from "lucide-react";
import Link from "next/link";
import {
  createCoupon,
  fetchCoupons,
  updateCoupon as updateCouponAction,
} from "../../actions/coupons";

interface Coupon {
  id: string;
  code: string;
  discount_percentage: number;
  max_discount_amount: number;
  min_order_amount: number;
  exhaust_limit: number;
  createdAt: string;
  updatedAt: string;
}

interface CouponProps {
  currentUserId: string | undefined;
}

const CouponsDashboard: React.FC<CouponProps> = async ({ currentUserId }) => {
  // State variables for coupon inputs
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState<number>();
  const [maxDiscountAmount, setMaxDiscountAmount] = useState<number>();
  const [minProductAmount, setMinProductAmount] = useState<number>();
  const [exhaustLimit, setExhaustLimit] = useState<number>();

  // State for coupons list and loading states
  const [coupons, setCoupons] = useState<Coupon[] | any>([]);
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch coupons from the server
  const fetchAllCoupons = useCallback(async () => {
    setIsUpdating(true);
    try {
      const fetchedCoupons = await fetchCoupons();
      setCoupons(fetchedCoupons);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast.error("Failed to fetch coupons");
    } finally {
      setIsInitialLoading(false);
      setIsUpdating(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    void fetchAllCoupons();
    const intervalId = setInterval(() => void fetchAllCoupons(), 10000);
    return () => clearInterval(intervalId);
  }, [fetchAllCoupons]);

  // Add a new coupon
  const addCoupon = async () => {
    // Basic validation
    if (
      !couponCode ||
      discountPercentage! <= 0 ||
      maxDiscountAmount! <= 0 ||
      minProductAmount! < 0 ||
      exhaustLimit! < 0
    ) {
      toast.error("Please fill in all fields with valid values");
      return;
    }

    setIsAddingCoupon(true);
    try {
      const newCouponData = {
        code: couponCode,
        discount_percentage: discountPercentage,
        max_discount_amount: maxDiscountAmount,
        min_order_amount: minProductAmount,
        exhaust_limit: exhaustLimit,
      };
      const createdCoupon = await createCoupon(newCouponData);
      setCoupons((prev: any) => [createdCoupon, ...prev]);
      // Reset input fields
      setCouponCode("");
      setDiscountPercentage(0);
      setMaxDiscountAmount(0);
      setMinProductAmount(0);
      setExhaustLimit(0);
      toast.success(`Coupon "${createdCoupon!?.code}" added successfully`);
    } catch (error) {
      console.error("Error adding coupon:", error);
      toast.error("Failed to add coupon");
    } finally {
      setIsAddingCoupon(false);
    }
  };

  // Update an existing coupon
  const handleUpdateCoupon = async (updatedCoupon: Coupon) => {
    setIsUpdating(true);
    try {
      const updated = await updateCouponAction(updatedCoupon);
      setCoupons((prev: any) =>
        prev.map((coupon: any) =>
          coupon.id === updated!?.id ? updated : coupon
        )
      );
      toast.success(`Coupon "${updated!?.code}" updated successfully`);
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast.error("Failed to update coupon");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading Coupons...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Add Coupon Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add Coupon</CardTitle>
          <CardDescription>
            Create coupons for your amazing customers
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full gap-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 basis-2/3">
            <Input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon Code"
              disabled={isAddingCoupon}
            />
            <Input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              placeholder="Discount Percentage"
              disabled={isAddingCoupon}
            />
            <Input
              type="number"
              value={maxDiscountAmount}
              onChange={(e) => setMaxDiscountAmount(Number(e.target.value))}
              placeholder="Max Discount Amount"
              disabled={isAddingCoupon}
            />
            <Input
              type="number"
              value={minProductAmount}
              onChange={(e) => setMinProductAmount(Number(e.target.value))}
              placeholder="Min Product Amount"
              disabled={isAddingCoupon}
            />
            <Input
              type="number"
              value={exhaustLimit}
              onChange={(e) => setExhaustLimit(Number(e.target.value))}
              placeholder="Exhaust Limit"
              disabled={isAddingCoupon}
            />
          </div>
          <Button onClick={addCoupon} disabled={isAddingCoupon}>
            {isAddingCoupon ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Coupon"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Coupons List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Created Coupons</h2>
        <Button
          variant="neutral"
          size="sm"
          onClick={() => void fetchAllCoupons()}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>

      {/* Coupons List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coupons.map((coupon: Coupon) => (
          <Card key={coupon.id} className="w-full">
            <CardHeader>
              <CardTitle className="truncate text-sm">
                {coupon.code}
              </CardTitle>
              <CardDescription>
                Discount: {coupon?.discount_percentage}%
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p>
                <strong>Max Discount:</strong> ${coupon?.max_discount_amount}
              </p>
              <p>
                <strong>Min Product Amount:</strong> ${coupon?.min_order_amount}
              </p>
              <p>
                <strong>Exhaust Limit:</strong> {coupon?.exhaust_limit}
              </p>
              <div className="mt-4 flex justify-end">
                {/* <Link href={`/coupons/edit/${coupon.id}`}>
                  <Button size="sm" className="flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </Link> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CouponsDashboard;
