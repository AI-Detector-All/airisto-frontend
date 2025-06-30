'use client'
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import { getUserSubscription } from "@/services/user-subscription";
import { UserSubscription } from "@/types/user-subscription";

export const useSubscription = () => {
    const { user, isLoading } = useAuth();
    const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getSubscription = async () => {
        if (!user) return;
        try {
            setLoading(true);
            setError(null);
            const response = await getUserSubscription(user.id);
            setSubscription(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error('Subscription fetch error:', err);
            if (err.status === 404 || err.response?.status === 404) {
                setSubscription(null);
                setError('No subscription found');
            } else {
                setSubscription(null);
                setError('Failed to fetch subscription');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoading) return;

        if (user) {
            getSubscription();
        } else {
            setSubscription(null);
            setLoading(false);
        }
    }, [user, isLoading]);

    return {
        subscription,
        loading,
        error,
        refetch: getSubscription
    };
}